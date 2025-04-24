import { Project } from "@/types/project";

export const initialData: Project[] = [
  {
    project: "Medipulssi ja sijoitukset",
    todo: [],
    done: ["Tilkkarille viesti"],
    subProjects: [
      {
        name: "Asema",
        todo: ["Vastaaja"],
        done: ["Käy läpi etävastaanotto sivustot"]
      },
      {
        name: "Mex-Man",
        todo: [],
        done: ["Uusien valmistajien kontaktointi"]
      },
      {
        name: "Decorative",
        todo: [],
        done: []
      }
    ]
  },
  {
    project: "Hafidh",
    todo: [],
    done: [
      "Shinaz table DM",
      "Preset memorization logic, which can be modified by the user (listen first x times, repeat x times, test without seeing x times (possibility to slide with finger to see parts of/the whole ayah), mark as memorized, move to next verse/ayah, repeat the same, connect, and so on until day's goal is finished)",
      "List of testers",
      "Short-term and long-term memorization revision rules",
      "10 preset memorization challenges"
    ],
    subProjects: []
  },
  {
    project: "Amr & Ali",
    todo: [],
    done: [
      "Meta Business Suite",
      "Videot markkinointibisnestä varten"
    ],
    subProjects: []
  },
  {
    project: "Shamal",
    todo: [
      "MYYNTII",
      "Visakoivumeili",
      "Visma / Paytrail / Flatpay sopimus",
      "Business Finland",
      "Verkkosivut",
      "Pop-up paikat (Itis)",
      "Fragrantica",
      "Trademark/Tavaramerkki (luokka 3)",
      "Ostoehdot"
    ],
    done: [
      "Posti sopimus",
      "Säännölliset viikkokokoukset",
      "MobilePay",
      "DHL hajuveden lähetys",
      "Maksupääte",
      "Pankkitili",
      "Ennakkoperintä kysely vero",
      "Kirjanpitäjä",
      "Yrityssuunnitelma",
      "Firman perustaminen",
      "Muttaqin kaa puhuminen",
      "Tapahtuma: Tarjoilut",
      "Alkupuheet",
      "Kiertelyä pisteissä ja tuotteiden osto",
      "Tarvikelista ja sisustus avajaisiin: Zaki kaiutin 👍🏾",
      "Lasit: minä (18 lasia/lautasta, 1 barrad, 1 lautanen), Zaki (8 lautasta ja lasia), Diaa",
      "Projektori",
      "Pöytiä Medipulssilta",
      "Mint Tea Thermos"
    ],
    subProjects: []
  },
  {
    project: "HHA International",
    todo: [],
    done: [],
    subProjects: []
  },
  {
    project: "SMF",
    todo: [
      "Toimintakertomus",
      "Juttele Jenniferin, Larakin ja Tanveerin kanssa"
    ],
    done: [
      "Laadi vastaus vastakkaisen sukupuolen hoitamiseen hoitoalalla",
      "Niya-hankkeen kommentointi"
    ],
    subProjects: []
  },
  {
    project: "Koraanikilpailu",
    todo: [],
    done: [
      "Ehdotus logistiikkaan karsintoihin osallistujille",
      "Kiitoskirje viime kerran sponsoreille"
    ],
    subProjects: []
  }
];
