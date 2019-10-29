# #!/usr/bin/expect -f
# set host "202.182.121.139";
# set password "-d7G-U}fgt-}qx@P";
# set timeout -1;

# send_user "安装依赖\n";
# spawn rm -rf node_modules;
# expect eof;
# spawn yarn install;
# expect eof;
# send_user "执行打包\n";
# spawn npm run build:prod;
# expect eof;
# send_user "打包完成\n";
# send_user "上传文件\n";
# spawn scp -r ./dist root@$host:~/nginx/www/;
# expect {
#     "(yes/no)?"
#     {
#         send "yes\n";
#         exp_continue;
#     }
#     "*assword:"
#     {
#         send -- "$password\n";
#         exp_continue;
#     }
#     "100%"
#     {
#         expect eof;
#     }
# }
# send_user "上传完成\n";
# spawn ssh root@$host;
# expect {
#     "(yes/no)?"
#     {
#         send "yes\n";
#         exp_continue;
#     }
#     "*assword"
#     {
#         send -- "$password\n";
#         exp_continue;
#     }
#     "#"
#     {
#         send "cd ~/nginx/www\n";
#         send "rm -rf web\n";
#         send "mv dist web\n";
#         send "docker restart nginx\n";
#         send  "exit\r";
#     }
# }
# expect eof;
# send_user "部署完成\n";

# rsync  -avzP --delete ./dist/* root@202.182.121.139:~/nginx/www/web/
host="122.51.109.123"

# echo '安装依赖';
# rm -rf node_modules;
# yarn install;
echo '执行打包';
npm run build:prod;
echo '打包完成';
echo "上传文件";
scp -r ./dist root@$host:~/nginx/www/;
# rsync  -avzP --delete ./dist/* root@$host:~/nginx/www/dist/
echo "上传完成"
ssh root@$host > /dev/null 2>&1 << eeooff
docker restart web;
exit;
eeooff
echo "部署完成";
