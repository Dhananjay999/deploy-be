## Init Setup

- Activate python 3.12.x using the following command
  `pyenv shell 3.12.x`

- Install dependencies using the following command
  `poetry install`

## for running Application

`poetry run python3 -m app.app`

## Folder Structure

```
├── temp/
│   ├── send.py
├── app/
│   ├── constants/
│   │   ├── constant.py
│   ├── __init__.py
│   ├── utils/
│   │   ├── env_config.py
│   │   ├── __init__.py
│   │   ├── logger.py
│   │   ├── conversation_count.py
│   ├── rabbitMQ/
│   │   ├── __init__.py
│   │   ├── consumar.py
│   ├── models/
│   │   ├── conversation_count.py
│   ├── app.py
│   ├── db/
│   │   ├── mongo_db_client.py
│   │   ├── __init__.py
│   ├── api/
│   │   ├── endpoints.py
├── .env.sample
├── pyproject.toml
├── README.md
├── .gitignore
├── .env.json
├── poetry.lock
```
