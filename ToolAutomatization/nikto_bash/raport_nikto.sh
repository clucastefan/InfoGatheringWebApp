#!/bin/bash

command="$1"
echo "Informatii nikto : " > SCANS/$1/raport_nikto
echo "Nikto este un scanner pentru vulnerabilitati ce scaneaza servere web pentru fisiere si CGI-uri periculoase, ver-" >> SCANS/$1/raport_nikto
echo "siuni software vechi ale serverului si alte probleme. Efectueaza verificari generice dar si specifice serverului" >> SCANS/$1/raport_nikto
echo "" >> SCANS/$1/raport_nikto
echo "$(cat SCANS/$1/nikto_simplu | sed -e 1d | head -n -1)" >> SCANS/$1/raport_nikto
echo "" >> SCANS/$1/raport_nikto
echo "$(cat SCANS/$1/nikto_ssl | sed -e 1d | head -n -1)" >> SCANS/$1/raport_nikto
