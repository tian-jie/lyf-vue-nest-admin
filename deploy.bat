cd ../retro-clean-for-deploy
git pull
docker build -t home.zainot.com:5001/retroboard:latest .
docker push home.zainot.com:5001/retroboard:latest