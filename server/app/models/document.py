"""Document model — stores uploaded files in MongoDB."""

from datetime import datetime, timezone
from typing import Optional
from beanie import Document as BeanieDocument
from pydantic import Field


class UploadedDocument(BeanieDocument):
    """Stores file metadata and binary content (base64) in MongoDB."""

    msme_id: str
    owner_id: str
    file_name: str
    file_type: str  # e.g. "application/pdf", "image/png"
    file_size: int  # bytes
    category: str = "other"  # gst_certificate, pan_card, bank_statement, incorporation, other
    description: Optional[str] = None
    file_data: str  # base64-encoded file content
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "documents"

    class Config:
        json_schema_extra = {
            "example": {
                "msme_id": "abc123",
                "owner_id": "user123",
                "file_name": "gst_certificate.pdf",
                "file_type": "application/pdf",
                "file_size": 204800,
                "category": "gst_certificate",
                "description": "GST Registration Certificate",
            }
        }
