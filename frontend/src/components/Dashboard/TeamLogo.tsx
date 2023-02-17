import React from "react";
import * as logos from "react-nba-logos";
import { Icon } from "react-nba-logos";

const NbaLogos: {
  [key: string]: Icon;
} = {
  ATL: logos.ATL,
  BKN: logos.BKN,
  BOS: logos.BOS,
  CHA: logos.CHA,
  CHI: logos.CHI,
  CLE: logos.CLE,
  DAL: logos.DAL,
  DEN: logos.DEN,
  DET: logos.DET,
  GSW: logos.GSW,
  HOU: logos.HOU,
  IND: logos.IND,
  LAC: logos.LAC,
  LAL: logos.LAL,
  MEM: logos.MEM,
  MIA: logos.MIA,
  MIL: logos.MIL,
  MIN: logos.MIN,
  NOP: logos.NOP,
  NYK: logos.NYK,
  OKC: logos.OKC,
  ORL: logos.ORL,
  PHI: logos.PHI,
  PHX: logos.PHX,
  POR: logos.POR,
  SAC: logos.SAC,
  SAS: logos.SAS,
  TOR: logos.TOR,
  UTA: logos.UTA,
  WAS: logos.WAS,
};

interface TeamLogoProps {
  team: string;
}

export const TeamLogo = ({ team }: TeamLogoProps) => {
  const Logo = NbaLogos[team];
  return <Logo />;
};
