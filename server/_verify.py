import httpx

BASE = "http://localhost:5000/api/v1"

for email, label in [("example@gmail.com", "MSME Owner"), ("officer@gmail.com", "Bank Officer")]:
    print(f"\n{'='*50}")
    print(f"{label} ({email})")
    print(f"{'='*50}")
    
    r = httpx.post(f"{BASE}/auth/login", json={"email": email, "password": "12345678"}, timeout=10)
    d = r.json()
    print(f"Login: {d['success']} - {d['data']['user']['name']} ({d['data']['user']['role']})")
    
    h = {"Authorization": f"Bearer {d['data']['accessToken']}"}
    
    r2 = httpx.get(f"{BASE}/msmes/", headers=h, timeout=10)
    msmes = r2.json()
    print(f"MSMEs: {len(msmes['data'])}")
    for m in msmes['data']:
        s = m.get('latestScoreId')
        if isinstance(s, dict):
            print(f"  {m['businessName']}: Score={s['scoreValue']} ({s['riskCategory']})")
        else:
            print(f"  {m['businessName']}: No score linked")

    if msmes['data']:
        mid = msmes['data'][0]['_id']
        r3 = httpx.get(f"{BASE}/scoring/{mid}/latest", headers=h, timeout=10)
        sc = r3.json()
        if sc.get('success'):
            sd = sc['data']
            print(f"Score: {sd['scoreValue']} | Loan: Rs{sd.get('recommendedLoanAmount',0):,.0f} | Schemes: {sd.get('eligibleGovernmentSchemes',[])}")
            print(f"SHAP: {len(sd.get('shapSummary',[]))} features | Stress: {len(sd.get('stressSignals',[]))} signals")
        
        r4 = httpx.get(f"{BASE}/scoring/{mid}/history", headers=h, timeout=10)
        hist = r4.json()
        print(f"Score History: {len(hist.get('data',[]))} entries")
        
        r5 = httpx.get(f"{BASE}/gst/{mid}", headers=h, timeout=10)
        print(f"GST Records: {r5.json().get('meta',{}).get('total',0)}")
        
        r6 = httpx.get(f"{BASE}/transactions/{mid}", headers=h, timeout=10)
        print(f"Transactions: {r6.json().get('meta',{}).get('total',0)}")

    r7 = httpx.get(f"{BASE}/loans/", headers=h, timeout=10)
    loans = r7.json()
    print(f"Loans: {len(loans['data'])}")
    for l in loans['data']:
        biz = l.get('msmeId', {})
        name = biz.get('businessName','?') if isinstance(biz, dict) else '?'
        print(f"  Rs{l['requestedAmount']:,.0f} | {l['loanPurpose']} | {l['status']} | {name}")

print("\n✅ Done")
