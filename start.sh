#!/bin/sh
cd ./api/
gunicorn --bind 0.0.0.0:5000 main:app --daemon