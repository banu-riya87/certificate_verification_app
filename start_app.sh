#!/bin/bash
# Start backend and frontend for Certificate Verification DApp

# Start backend
cd backend
npm install
node server.js &
BACKEND_PID=$!
cd ..

# Start frontend (using http-server)
cd frontend
npm install -g http-server
http-server -p 8080 &
FRONTEND_PID=$!
cd ..

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
