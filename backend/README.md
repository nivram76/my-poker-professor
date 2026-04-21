# PokerSense Backend

Minimal FastAPI scaffold for the hand creation/review contract.

Current scope:
- Accept structured hands
- Return a hand by id
- Use in-memory storage only

Deferred:
- PostgreSQL persistence
- Redis caching/queues
- Authentication
- AI coach integration

Run locally after installing dependencies:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```
