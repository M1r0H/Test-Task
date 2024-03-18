#!/bin/bash

# Получаем ID процесса, который использует порт 5432
PID1=$(lsof -t -i:5432)

# Если порт 5432 занят, останавливаем соответствующий процесс
if [ -n "$PID1" ]; then
    echo "Port 5432 is in use by process $PID1. Attempting to kill..."
    kill -9 $PID1
    if [ $? -eq 0 ]; then
        echo "Process $PID1 has been terminated."
    else
        echo "Failed to terminate process $PID1. Please check your permissions and try again."
        exit 1
    fi
fi

# Получаем ID процесса, который использует порт 3001
PID2=$(lsof -t -i:3001)

# Если порт 3001 занят, останавливаем соответствующий процесс
if [ -n "$PID2" ]; then
    echo "Port 3001 is in use by process $PID2. Attempting to kill..."
    kill -9 $PID2
    if [ $? -eq 0 ]; then
        echo "Process $PID2 has been terminated. Proceeding with docker-compose up..."
    else
        echo "Failed to terminate process $PID2. Please check your permissions and try again."
        exit 1
    fi
fi