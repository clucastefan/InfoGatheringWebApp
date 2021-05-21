#!/bin/bash

command="$1"
echo "Rezultate Nbtstat : " > SCANS/$command/share_nbtstat
echo "" >> SCANS/$command/share_nbtstat
echo "$(cat SCANS/$command/share_enum | grep '<')" >> SCANS/$command/share_nbtstat
echo "" >> SCANS/$command/share_nbtstat
