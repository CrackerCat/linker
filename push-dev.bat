@echo off 

SET comment=%1

cd gen
node index.js
cd ../

git add .
git commit -m "%comment%"
git push origin-github dev --tags 