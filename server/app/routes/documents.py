"""Document routes — upload, list, download, delete."""

import base64
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from typing import Optional

from app.models.document import UploadedDocument
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/v1/documents", tags=["documents"])

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


@router.post("")
async def upload_document(
    file: UploadFile = File(...),
    msmeId: str = Form(...),
    category: str = Form("other"),
    description: Optional[str] = Form(None),
    current_user=Depends(get_current_user),
):
    """Upload a document and store it in MongoDB."""
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(400, "File too large. Maximum size is 10 MB.")

    doc = UploadedDocument(
        msme_id=msmeId,
        owner_id=str(current_user.id),
        file_name=file.filename or "unnamed",
        file_type=file.content_type or "application/octet-stream",
        file_size=len(contents),
        category=category,
        description=description,
        file_data=base64.b64encode(contents).decode("utf-8"),
    )
    await doc.insert()

    return {
        "success": True,
        "data": {
            "_id": str(doc.id),
            "msmeId": doc.msme_id,
            "fileName": doc.file_name,
            "fileType": doc.file_type,
            "fileSize": doc.file_size,
            "category": doc.category,
            "description": doc.description,
            "createdAt": doc.created_at.isoformat(),
        },
    }


@router.get("/{msme_id}")
async def list_documents(msme_id: str, current_user=Depends(get_current_user)):
    """List all documents for an MSME (excludes file_data for performance)."""
    docs = await UploadedDocument.find(
        UploadedDocument.msme_id == msme_id
    ).sort("-created_at").to_list()

    return {
        "success": True,
        "data": [
            {
                "_id": str(d.id),
                "msmeId": d.msme_id,
                "fileName": d.file_name,
                "fileType": d.file_type,
                "fileSize": d.file_size,
                "category": d.category,
                "description": d.description,
                "createdAt": d.created_at.isoformat(),
            }
            for d in docs
        ],
    }


@router.get("/{doc_id}/download")
async def download_document(doc_id: str, current_user=Depends(get_current_user)):
    """Download a document (returns base64 data)."""
    from bson import ObjectId

    doc = await UploadedDocument.get(ObjectId(doc_id))
    if not doc:
        raise HTTPException(404, "Document not found")

    return {
        "success": True,
        "data": {
            "_id": str(doc.id),
            "fileName": doc.file_name,
            "fileType": doc.file_type,
            "fileSize": doc.file_size,
            "fileData": doc.file_data,
        },
    }


@router.delete("/{doc_id}")
async def delete_document(doc_id: str, current_user=Depends(get_current_user)):
    """Delete a document."""
    from bson import ObjectId

    doc = await UploadedDocument.get(ObjectId(doc_id))
    if not doc:
        raise HTTPException(404, "Document not found")

    # Only owner or admin can delete
    if doc.owner_id != str(current_user.id) and current_user.role != "admin":
        raise HTTPException(403, "Not authorized to delete this document")

    await doc.delete()
    return {"success": True, "message": "Document deleted"}
