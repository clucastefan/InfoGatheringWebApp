#!/bin/bash

command="$1"
echo "$(cat SCANS/$command/share_enum | grep -A18 -w "Password Info for" | sed 's/\[+]//' | sed 's/^.//'; cat SCANS/$command/share_enum | grep "Password Complexity:")" > SCANS/$command/share_pass
echo "" >> SCANS/$command/share_pass