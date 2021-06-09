#!/bin/bash

command="$1"
echo "Scanarea fiserelor si directoare" > SCANS/$1/raport_dirb
echo "[NOTA] Unele date pot fi fals pozitive" >> SCANS/$1/raport_dirb
echo "URL_BASE: http://$command/" >> SCANS/$1/raport_dirb
echo "WORDLIST_FILES: common.txt" >> SCANS/$1/raport_dirb
echo "" >> SCANS/$1/raport_dirb
echo "$(cat SCANS/192.168.254.136/dirb_scan | grep -w 'http' | sed '/^-/d' | tail -n +2 | sed -e 's/+/FILE:/g')" >> SCANS/$1/raport_dirb
