#!/bin/bash

command="$1"
echo "Utilizatorii enumerati : [user] [rid]" > SCANS/$command/share_users
echo "" >> SCANS/$command/share_users
echo "$(cat SCANS/$command/share_enum | grep -w "user:")" >> SCANS/$command/share_users
echo "" >> SCANS/$command/share_users
