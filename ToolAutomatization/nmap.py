#!/usr/bin/python3

import subprocess
import sys
import re

REGEX_IP = "^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
REGEX_DNS = "^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$"

user_input = sys.argv[1]
comanda_mkdir = "mkdir SCANS/" + user_input
comanda_scanPorts = "nmap -T4 " + user_input + " > SCANS/" + user_input + "/scanare"
comanda_getPorts = "./onlyports.sh " + user_input
comanda_check = 'ls SCANS'
comanda_dir = 'mkdir SCANS'


def mkdir_scans():
    subprocess.run(comanda_mkdir, shell=True)


def verificare_input(input):
    pattern_ip = re.compile(REGEX_IP)
    pattern_dns = re.compile(REGEX_DNS)
    if pattern_ip.search(input):
        print('Scanare nmap pentru ' + input)
    elif pattern_dns.search(input):
        print('Scanare nmap pentru ' + input)
    else:
        raise Exception("Adresa trebuie sa fie de tipul IPv4 sau DNS")


def verificare_folder_scanari():
    check = subprocess.run(comanda_check, shell=True, stderr=subprocess.DEVNULL)
    if check.returncode != 0:
        subprocess.run(comanda_dir, shell=True, check=True, stderr=subprocess.DEVNULL)


def scan_ports_servies():
    scanare_nmapPorts = subprocess.run(comanda_scanPorts, shell=True)
    if scanare_nmapPorts.returncode == 0:
        global ports
        ports = subprocess.check_output(comanda_getPorts, shell=True).strip()

        subprocess.run('rm -rf SCANS/' + user_input + '/scanare', shell=True)
        comanda_scanService = "nmap -sV -p" + ports.decode() + " -T4 " + user_input + " > " + "SCANS/" + user_input + "/scan"
        scanare_nmapService = subprocess.run(comanda_scanService, shell=True)

        if scanare_nmapService.returncode == 0:
            print('Scanarea serviciilor efectuata cu succes')
    else:
        raise Exception("A aparut o eroare in timpul scanarii. Verifica datele")


def vuln_scan():
    print("Scanarea pentru vulnerabilitati inceputa")
    comanda_vulnScan = "nmap -sV --script=vuln -p" + ports.decode() + " -T4 " + user_input + " > SCANS/" + user_input + "/vuln_scan"
    scanare_vulnScan = subprocess.run(comanda_vulnScan,shell=True)
    if scanare_vulnScan.returncode == 0:
        print('TODO script prelucrare vuln_scan')
    else:
        raise Exception("A aparut o eroare in timpul scanarii. Verifica datele")


verificare_input(user_input)
verificare_folder_scanari()
mkdir_scans()
scan_ports_servies()
vuln_scan()


