#!/bin/bash

command="$1"
echo " >>> RAPORT SCANARE FULL ( WEB + SERVER ) <<<" > SCANS/$1/raport_full
echo "" >> SCANS/$1/raport_full
echo "$(cat SCANS/$command/raport_server)" >> SCANS/$1/raport_full
echo "" >> SCANS/$1/raport_full
echo "$(cat SCANS/$command/raport_web)" >> SCANS/$1/raport_full
