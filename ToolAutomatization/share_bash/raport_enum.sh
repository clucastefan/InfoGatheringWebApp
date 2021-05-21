#!/bin/bash

command="$1"
echo "Scanare samba pentru $command" > SCANS/$1/raport_shareEnum
echo "" >> SCANS/$1/raport_shareEnum
echo "$(cat SCANS/$1/share_folders SCANS/$1/share_nbtstat SCANS/$1/share_pass SCANS/$1/share_users)" >> SCANS/$command/raport_shareEnum