#!/bin/bash

command="$1"
echo "$(cat SCANS/$command/vuln_scan | tail -n +7 | sed 's/|//g'  | sed '/^_/d' | awk '!/vulners:/' | sed -e "s/[[:space:]][[:space:]]\+/ /g" | grep / | awk '!/performed/' | awk '!/:80/' | awk '!/images/' | sed '/tcp/ a \\n' | sed '/tcp/i \\n' | sed '$d')"