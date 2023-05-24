#!/bin/bash
TODAY=$(date)
HOST=$(hostname)
git switch dev
git add .
git commit -m "Changes committed: $TODAY from $HOST"

git push -u origin dev