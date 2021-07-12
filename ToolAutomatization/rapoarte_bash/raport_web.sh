#!/bin/bash

command="$1"
echo " >>> RAPORT SCANARE WEBSITE <<<" > SCANS/$1/raport_web
echo "" >> SCANS/$1/raport_web
echo "$(cat SCANS/$command/raport_nikto)" >> SCANS/$1/raport_web
echo "" >> SCANS/$1/raport_server
echo "$(cat SCANS/$command/raport_dirb)" >> SCANS/$1/raport_web
echo "" >> SCANS/$1/raport_web
echo "$(cat SCANS/$command/raport_zap)" >> SCANS/$1/raport_web
echo "" >> SCANS/$1/raport_web