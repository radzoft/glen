import { useState, useEffect, useRef } from "react";

export default function BootSequence({ typingSpeed = 80, onComplete }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(sessionStorage.getItem('on') === "true");
  const containerRef = useRef(null);

  const lines = [
    "Starting system boot process...",
    "[  OK  ] Started Journal Service",
    "[  OK  ] Mounted FUSE Control File System",
    "[  OK  ] Listening on D-Bus System Message Bus Socket",
    "[  OK  ] Reached target System Initialization",
    "[  OK  ] Started CUPS Scheduler",
    "[  OK  ] Reached target Network",
    "Starting Network Manager...",
    "[  OK  ] Started Network Manager",
    "Starting User Manager for UID 1000...",
    "[  OK  ] Started User Manager for UID 1000",
    "Initializing profile...",
    "[  OK  ] Personal Information Loaded",
    "[  OK  ] Name: Glen Alangilan",
    "[  OK  ] Location: Philippines",
    "[  OK  ] Email: root@radzoft.com",
    "Disabling unused services...",
    "[  OK  ] Hire Me button disabled",
    "[  OK  ] Contact form disabled",
    "Connecting to Seansoft...",
    "[  OK  ] Connected to Seansoft",
    "Reading package lists... Done",
    "Building dependency tree... Done",
    "Reading state information... Done",
    "The following additional packages will be installed:",
    "  build-essential git docker.io code postgresql kibana golang php awscli cloudflared gh htop net-tools dnsutils nmap",
    "The following NEW packages will be installed:",
    "  nodejs python3 build-essential git docker.io code postgresql kibana golang php awscli cloudflared gh htop net-tools dnsutils nmap",
    "0 upgraded, 15 newly installed, 0 to remove and 0 not upgraded.",
    "Need to get 200 MB of archives.",
    "After this operation, 600 MB of additional disk space will be used.",
    "Get:1 http://deb.debian.org/debian bullseye/main amd64 nodejs 16.x [20.0 MB]",
    "Get:2 http://deb.debian.org/debian bullseye/main amd64 python3 3.9.2-3 [23.0 MB]",
    "Get:3 http://deb.debian.org/debian bullseye/main amd64 build-essential 12.9 [7.0 MB]",
    "Get:4 http://deb.debian.org/debian bullseye/main amd64 git 1:2.30.2-1 [8.0 MB]",
    "Get:5 http://deb.debian.org/debian bullseye/main amd64 docker.io 20.10.5-1 [30.0 MB]",
    "Get:6 http://deb.debian.org/debian bullseye/main amd64 code 1.55.2-1 [50.0 MB]",
    "Get:7 http://deb.debian.org/debian bullseye/main amd64 postgresql 13+225 [15.0 MB]",
    "Get:8 http://deb.debian.org/debian bullseye/main amd64 kibana 7.10.2 [25.0 MB]",
    "Get:9 http://deb.debian.org/debian bullseye/main amd64 golang 1.16.5 [10.0 MB]",
    "Get:10 http://deb.debian.org/debian bullseye/main amd64 php 7.4 [10.0 MB]",
    "Get:11 http://deb.debian.org/debian bullseye/main amd64 awscli 1.18.69 [5.0 MB]",
    "Get:12 http://deb.debian.org/debian bullseye/main amd64 cloudflared 2021.5.8 [5.0 MB]",
    "Get:13 http://deb.debian.org/debian bullseye/main amd64 gh 1.9.2 [5.0 MB]",
    "Get:14 http://deb.debian.org/debian bullseye/main amd64 htop 3.0.5 [2.0 MB]",
    "Get:15 http://deb.debian.org/debian bullseye/main amd64 net-tools 1.60+git20181103.0eebece-1 [1.0 MB]",
    "Get:16 http://deb.debian.org/debian bullseye/main amd64 dnsutils 1:9.16.15-1 [1.0 MB]",
    "Get:17 http://deb.debian.org/debian bullseye/main amd64 nmap 7.91+dfsg1+really7.80+dfsg1-2 [5.0 MB]",
    "Fetched 200 MB in 12s (16 MB/s)",
    "Selecting previously unselected package nodejs.",
    "(Reading database ... 50000 files and directories currently installed.)",
    "Preparing to unpack .../00-nodejs_16.x_amd64.deb ...",
    "Unpacking nodejs (16.x) ...",
    "Selecting previously unselected package python3.",
    "Preparing to unpack .../01-python3_3.9.2-3_amd64.deb ...",
    "Unpacking python3 (3.9.2-3) ...",
    "Selecting previously unselected package build-essential.",
    "Preparing to unpack .../02-build-essential_12.9_amd64.deb ...",
    "Unpacking build-essential (12.9) ...",
    "Selecting previously unselected package git.",
    "Preparing to unpack .../03-git_1:2.30.2-1_amd64.deb ...",
    "Unpacking git (1:2.30.2-1) ...",
    "Selecting previously unselected package docker.io.",
    "Preparing to unpack .../04-docker.io_20.10.5-1_amd64.deb ...",
    "Unpacking docker.io (20.10.5-1) ...",
    "Selecting previously unselected package code.",
    "Preparing to unpack .../05-code_1.55.2-1_amd64.deb ...",
    "Unpacking code (1.55.2-1) ...",
    "Selecting previously unselected package postgresql.",
    "Preparing to unpack .../06-postgresql_13+225_amd64.deb ...",
    "Unpacking postgresql (13+225) ...",
    "Selecting previously unselected package kibana.",
    "Preparing to unpack .../07-kibana_7.10.2_amd64.deb ...",
    "Unpacking kibana (7.10.2) ...",
    "Selecting previously unselected package golang.",
    "Preparing to unpack .../08-golang_1.16.5_amd64.deb ...",
    "Unpacking golang (1.16.5) ...",
    "Selecting previously unselected package php.",
    "Preparing to unpack .../09-php_7.4_amd64.deb ...",
    "Unpacking php (7.4) ...",
    "Selecting previously unselected package awscli.",
    "Preparing to unpack .../10-awscli_1.18.69_amd64.deb ...",
    "Unpacking awscli (1.18.69) ...",
    "Selecting previously unselected package cloudflared.",
    "Preparing to unpack .../11-cloudflared_2021.5.8_amd64.deb ...",
    "Unpacking cloudflared (2021.5.8) ...",
    "Selecting previously unselected package gh.",
    "Preparing to unpack .../12-gh_1.9.2_amd64.deb ...",
    "Unpacking gh (1.9.2) ...",
    "Selecting previously unselected package htop.",
    "Preparing to unpack .../13-htop_3.0.5_amd64.deb ...",
    "Unpacking htop (3.0.5) ...",
    "Selecting previously unselected package net-tools.",
    "Preparing to unpack .../14-net-tools_1.60+git20181103.0eebece-1_amd64.deb ...",
    "Unpacking net-tools (1.60+git20181103.0eebece-1) ...",
    "Selecting previously unselected package dnsutils.",
    "Preparing to unpack .../15-dnsutils_1:9.16.15-1_amd64.deb ...",
    "Unpacking dnsutils (1:9.16.15-1) ...",
    "Selecting previously unselected package nmap.",
    "Preparing to unpack .../16-nmap_7.91+dfsg1+really7.80+dfsg1-2_amd64.deb ...",
    "Unpacking nmap (7.91+dfsg1+really7.80+dfsg1-2) ...",
    "Setting up nodejs (16.x) ...",
    "Setting up python3 (3.9.2-3) ...",
    "Setting up build-essential (12.9) ...",
    "Setting up git (1:2.30.2-1) ...",
    "Setting up docker.io (20.10.5-1) ...",
    "Setting up code (1.55.2-1) ...",
    "Setting up postgresql (13+225) ...",
    "Setting up kibana (7.10.2) ...",
    "Setting up golang (1.16.5) ...",
    "Setting up php (7.4) ...",
    "Setting up awscli (1.18.69) ...",
    "Setting up cloudflared (2021.5.8) ...",
    "Setting up gh (1.9.2) ...",
    "Setting up htop (3.0.5) ...",
    "Setting up net-tools (1.60+git20181103.0eebece-1) ...",
    "Setting up dnsutils (1:9.16.15-1) ...",
    "Setting up nmap (7.91+dfsg1+really7.80+dfsg1-2) ...",
    "Processing triggers for man-db (2.9.4-2) ...",
    "Processing triggers for libc-bin (2.31-13+deb11u2) ...",
    "[  OK  ] Development environment setup complete",
    "Loading desktop environment...",
    "[  OK  ] System startup complete",
  ];


  useEffect(() => {
    if (currentLine >= lines.length || sessionStorage.getItem('on') === "true") {
      setIsComplete(true);
      onComplete?.();
      sessionStorage.setItem('on', "true");
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedLines(prev => [...prev, lines[currentLine]]);
      setCurrentLine(prev => prev + 1);
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentLine, lines, typingSpeed, onComplete]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines]);

  // Function to render a line with "OK" in green
  const renderLineWithGreenOK = (line) => {
    if (line.includes("OK")) {
      const parts = line.split(/(OK)/g);
      return (
        <>
          {parts.map((part, i) => 
            part === "OK" ? 
              <span key={i} className="text-green-500">{part}</span> : 
              <span key={i}>{part}</span>
          )}
        </>
      );
    }
    return line;
  };

  return (
    <div ref={containerRef} className="bg-black text-white font-mono p-4 rounded-md whitespace-pre-wrap overflow-y-auto max-h-screen h-full w-full scrollbar-hide">
      {displayedLines.map((line, index) => (
        <div key={index} className="mb-1">
          {renderLineWithGreenOK(line)}
        </div>
      ))}
      {!isComplete && (
        <div className="animate-pulse">_</div>
      )}
    </div>
  );
}
