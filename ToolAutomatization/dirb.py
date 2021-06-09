#!/usr/bin/python3

import subprocess
import sys
import re

REGEX_IP = "^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
REGEX_DNS = "^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$"

user_input = sys.argv[1]
comanda_verificare_folder = "ls SCANS/" + user_input
comanda_creare_folder = "mkdir SCANS; mkdir SCANS/" + user_input
comanda_scan_dirb = "dirb http://" + user_input + " -w -o SCANS/" + user_input + "/dirb_scan"
comanda_raport_dirb = "./dirb_bash/raport_dirb.sh " + user_input
sterge_fisiere = "rm -rf SCANS/" + user_input + "/dirb_scan"


def verificare_input(input):
    pattern_ip = re.compile(REGEX_IP)
    pattern_dns = re.compile(REGEX_DNS)
    if pattern_ip.search(input):
        print('Scanare pentru resurse web ' + input)
    elif pattern_dns.search(input):
        print('Scanare pentru resurse web ' + input)
    else:
        raise Exception("Adresa trebuie sa fie de tipul IPv4 sau DNS")


def verificare_folder():
    check = subprocess.run(comanda_verificare_folder, shell=True, stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)
    if check.returncode != 0:
        subprocess.run(comanda_creare_folder, shell=True, stderr=subprocess.DEVNULL)


def scan_dirb():
    print("Se incepe enumerarea de directoare si fisiere")
    try:
        dirb = subprocess.run(comanda_scan_dirb, shell=True,stdout=subprocess.DEVNULL)
        if dirb.returncode == 0:
            print("Enumerare terminata")
    except:
        raise Exception("A aparut o eroare la enumerarea resurselor")


def raport_dirb():
    print("Se pregateste raportul")
    try:
        raport = subprocess.run(comanda_raport_dirb, shell=True,stdout=subprocess.DEVNULL)
        if raport.returncode == 0:
            print("Raport livrat")
        subprocess.run(sterge_fisiere, shell=True)
    except:
        raise Exception("A aparut o eroare la livrarea raportului")


verificare_input(user_input)
verificare_folder()
scan_dirb()
raport_dirb()