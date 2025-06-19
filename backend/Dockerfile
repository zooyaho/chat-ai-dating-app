FROM python:3.9

RUN useradd -m -u 1000 user
USER user

WORKDIR /home/user/app
COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "-m", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
