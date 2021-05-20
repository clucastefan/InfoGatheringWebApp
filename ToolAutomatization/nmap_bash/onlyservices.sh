#!/bin/bash

command="$1"
echo "$(cat SCANS/$command/scan | grep PORT; cat SCANS/$command/scan | grep tcp; cat SCANS/$command/scan | grep Service | sed '$d')"