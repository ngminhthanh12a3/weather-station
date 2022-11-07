build:
	sudo yarn build
	sudo rm -rf /var/www/vnpt-ws/*
	sudo cp -r ~/weather-station/my_umi_app/dist/* /var/www/vnpt-ws 
	sudo systemctl reload nginx