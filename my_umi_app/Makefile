build:
	sudo yarn build
	sudo rm -rf /var/www/vnpt-dep/*
	sudo cp -r ~/admin-dashboard-dep/my_umi_app/dist/* /var/www/vnpt-dep 
	sudo systemctl reload nginx