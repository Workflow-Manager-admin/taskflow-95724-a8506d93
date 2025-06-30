#!/bin/bash
cd /home/kavia/workspace/code-generation/taskflow-95724-a8506d93/task_manager_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

