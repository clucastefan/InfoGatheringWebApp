#!/bin/bash

command="$1"
echo "Testare brute force pentru $command" > SCANS/$1/raport_hydra
echo "Se testeaza SSH[22], FTP[21] si TELNET[23]" >> SCANS/$1/raport_hydra
echo "" >> SCANS/$1/raport_hydra
echo "[NOTA] Daca raportul este gol, inseamna ca nu fost gasite combinatii valide de utilizator-parola" >> SCANS/$1/raport_hydra
echo "" >> SCANS/$1/raport_hydra
echo "[ATENTIE] Protocolul telnet prin natura sa nu este de incredere." >> SCANS/$1/raport_hydra
echo "[ATENTIE] Unele rezultate pot fi fals-pozitive. Se recomanda restestare manuala pentru TOATE rezultatele obtinute" >> SCANS/$1/raport_hydra
echo "" >> SCANS/$1/raport_hydra
echo "$(cat SCANS/$command/hydra_ssh | grep ssh | tail -n +2)" >> SCANS/$1/raport_hydra
echo "$(cat SCANS/$command/hydra_ftp | grep ftp | tail -n +2)" >> SCANS/$1/raport_hydra
echo "$(cat SCANS/$command/hydra_telnet | grep telnet | tail -n +2)" >> SCANS/$1/raport_hydra
echo "" >> SCANS/$1/raport_hydra
echo "[ATENTIE] Se recomanda schimbarea imediata a credentialelor intrucat se gasesc in liste cunoscute." >> SCANS/$1/raport_hydra

