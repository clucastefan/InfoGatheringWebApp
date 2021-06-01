#!/bin/bash

command="$1"
echo "Informatii pentru $command" > SCANS/$command/share_folders
echo ""  >> SCANS/$command/share_folders
echo "$(cat SCANS/$command/share_enum | grep -w "Domain Name")" >> SCANS/$command/share_folders
echo "OS Info: $command" >> SCANS/$command/share_folders
echo "$(cat SCANS/$command/share_enum | grep -A4 -w "Got OS" | sed -e '/OS/d')" >> SCANS/$command/share_folders
echo "" >> SCANS/$command/share_folders
echo "Null Session : " >> SCANS/$command/share_folders
echo "$(cat SCANS/$command/share_enum | grep -w "allows sessions" | cut -c 5-)" >> SCANS/$command/share_folders
echo "" >> SCANS/$command/share_folders
echo "Enumerare Shares : " >> SCANS/$command/share_folders
echo "" >> SCANS/$command/share_folders
echo "$(cat SCANS/$command/share_enum | grep Disk; cat SCANS/$command/share_enum | grep IPC | sed '$d';cat SCANS/$command/share_enum | grep 'C$' | sed '$d')" >> SCANS/$command/share_folders
echo "" >> SCANS/$command/share_folders
echo "$(cat SCANS/$command/share_enum | grep -w "Mapping")" >> SCANS/$command/share_folders
echo "" >> SCANS/$command/share_folders

