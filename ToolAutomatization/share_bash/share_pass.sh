#!/bin/bash

command="$1"
echo "$(cat SCANS/10.10.254.71/share_enum | grep -A18 -w "Password Info for" | sed 's/\[+]//' | sed 's/^.//'; cat SCANS/10.10.254.71/share_enum | grep "Password Complexity:")" > SCANS/$command/share_pass
