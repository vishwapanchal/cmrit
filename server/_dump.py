"""Dump all data from MongoDB for inspection."""
import asyncio, os, sys, json
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
os.chdir(str(Path(__file__).parent))
from dotenv import load_dotenv
load_dotenv()

from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.user import User
from app.models.msme import MSME
from app.models.gst_record import GSTRecord
from app.models.transaction_record import TransactionRecord
from app.models.credit_score import CreditScore
from app.models.loan_application import LoanApplication

MONGO_URI = os.getenv("MONGO_URI")

async def dump():
    client = AsyncIOMotorClient(MONGO_URI)
    db_name = MONGO_URI.rsplit("/", 1)[-1].split("?")[0] or "creditsaathi"
    await init_beanie(database=client[db_name], document_models=[User, MSME, GSTRecord, TransactionRecord, CreditScore, LoanApplication])

    # Users
    print("=" * 60)
    print("USERS")
    print("=" * 60)
    users = await User.find_all().to_list()
    for u in users:
        print(f"  ID: {u.id} | {u.name} | {u.email} | {u.role}")

    # MSMEs
    print("\n" + "=" * 60)
    print("MSMEs")
    print("=" * 60)
    msmes = await MSME.find_all().to_list()
    for m in msmes:
        print(f"  ID: {m.id} | {m.business_name} | GSTIN: {m.gstin} | Owner: {m.owner}")
        print(f"    Sector: {m.sector} | Type: {m.business_type} | City: {m.city}")
        print(f"    Latest Score ID: {m.latest_score_id}")

    # GST Records
    print("\n" + "=" * 60)
    print(f"GST RECORDS (total: {await GSTRecord.count()})")
    print("=" * 60)
    for m in msmes:
        gsts = await GSTRecord.find(GSTRecord.msme_id == str(m.id)).sort("filing_period").to_list()
        print(f"\n  [{m.business_name}] — {len(gsts)} records")
        print(f"  {'Period':<12} {'Type':<8} {'OnTime':<8} {'Revenue':>12} {'Tax':>12}")
        print(f"  {'-'*56}")
        for g in gsts:
            print(f"  {g.filing_period:<12} {g.filing_type:<8} {'Yes' if g.filed_on_time else 'No':<8} {g.taxable_revenue:>12,.2f} {g.tax_paid:>12,.2f}")

    # Transaction Records
    print("\n" + "=" * 60)
    print(f"TRANSACTION RECORDS (total: {await TransactionRecord.count()})")
    print("=" * 60)
    for m in msmes:
        txs = await TransactionRecord.find(TransactionRecord.msme_id == str(m.id)).sort("month").to_list()
        print(f"\n  [{m.business_name}] — {len(txs)} records")
        print(f"  {'Month':<10} {'Inflow':>12} {'Outflow':>12} {'Net':>12} {'UPI#':>6} {'UPI Vol':>12} {'Bounces':>8} {'Punctuality':>12}")
        print(f"  {'-'*90}")
        for t in txs:
            print(f"  {t.month:<10} {t.total_inflow:>12,.2f} {t.total_outflow:>12,.2f} {t.net_cash_flow:>12,.2f} {t.upi_transaction_count:>6} {t.upi_volume:>12,.2f} {t.cheque_bounced_count:>8} {t.vendor_payments_punctuality:>12.2f}")

    # Credit Scores
    print("\n" + "=" * 60)
    print(f"CREDIT SCORES (total: {await CreditScore.count()})")
    print("=" * 60)
    for m in msmes:
        scores = await CreditScore.find(CreditScore.msme_id == str(m.id)).sort("-created_at").to_list()
        print(f"\n  [{m.business_name}] — {len(scores)} scores")
        for s in scores:
            print(f"    Score: {s.score_value} | Risk: {s.risk_category} | Loan: {s.recommended_loan_amount} | Band: {s.recommended_interest_band} | Date: {s.created_at}")

    # Loans
    print("\n" + "=" * 60)
    print(f"LOAN APPLICATIONS (total: {await LoanApplication.count()})")
    print("=" * 60)
    loans = await LoanApplication.find_all().to_list()
    for l in loans:
        msme_name = next((m.business_name for m in msmes if str(m.id) == l.msme_id), "?")
        print(f"  Rs{l.requested_amount:>12,} | {l.loan_purpose:<18} | {l.status:<14} | {msme_name}")
        if l.officer_remarks:
            print(f"    Remarks: {l.officer_remarks}")

    client.close()

asyncio.run(dump())
