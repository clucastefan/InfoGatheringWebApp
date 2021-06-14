#!/bin/bash

command="$1"
echo "Scanarea pentru vulnerabilitati web" > SCANS/$1/raport_zap
echo "[URL] http://$1/dvwa" >> SCANS/$1/raport_zap
echo "" >> SCANS/$1/raport_zap
echo "REZUMAT : " >> SCANS/$1/raport_zap
echo "$(cat --number SCANS/$command/zap_scan_1.txt )" >> SCANS/$1/raport_zap
echo "$(cat SCANS/$command/zap_scan_2.txt | sed '/cweid/d' | sed '/wascid/d' | sed '/sourceid/d' | sed '/reference/d' |
sed '/pluginid/d' | sed '/alertRef/d' | sed '/confidence/d' | sed '/instance/d' | sed '/site/d' | sed '/alerts/d' | sed '/alertitem/d' | sed '/name/d' |
sed 's/<p>//g' | sed 's/<\/p>//g' | sed -e 's/^/  /' | sed 's/  \[alert]/[ALERT]/g')" >> SCANS/$1/raport_zap
