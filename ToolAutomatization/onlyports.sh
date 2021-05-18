#!/bin/bash

command="$1"
echo "$(cat SCANS/$command/scanare | grep / | cut -d '/' -f1 | sed -n '1!p' | sed ':a;N;$!ba;s/\n/,/g')"