#!/bin/bash

path="$1"
ports="$2"
echo "Scanare nmap pentru $1" > SCANS/$path/raport_nmap
echo "Porturi disponibile $2" >> SCANS/$path/raport_nmap
echo "" >> SCANS/$path/raport_nmap
echo -e "\nServiciile care ruleaza ar putea fi vulnerabile la urmatoarele CVE-uri" >> SCANS/$path/nmap_service_scan
echo "$(cat SCANS/$path/nmap_service_scan SCANS/$path/nmap_vuln_scan >> SCANS/$path/raport_nmap)"