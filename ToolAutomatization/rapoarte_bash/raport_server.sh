#!/bin/bash

command="$1"
echo " >>> RAPORT SCANARE SERVER-SIDE <<<" > SCANS/$1/raport_server
echo "" >> SCANS/$1/raport_server
echo "$(cat SCANS/$command/raport_nmap)" >> SCANS/$1/raport_server
echo "" >> SCANS/$1/raport_server
echo "$(cat SCANS/$command/raport_hydra)" >> SCANS/$1/raport_server
echo "" >> SCANS/$1/raport_server
echo "$(cat SCANS/$command/raport_shareEnum)" >> SCANS/$1/raport_server
echo "" >> SCANS/$1/raport_server