#!/bin/bash

command="$1"
echo "$(cat SCANS/$command/share_enum | grep -w "No reply from" && cat SCANS/$command/share_enum | grep -w "Can't find workgroup")"