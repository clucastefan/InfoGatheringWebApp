#!/bin/bash

command="$1"
echo "Scanarea samba pentru $command a fost finalizata." > SCANS/$command/raport_enum
echo "Serverul scanat nu contine foldere in samba sau conexiunea cu serverul nu a putut fi stabilita" >> SCANS/$command/raport_enum
echo "" >> SCANS/$command/raport_enum