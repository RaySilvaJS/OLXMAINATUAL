const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio"); // Adicione esta linha para importar cheerio

// Função para criar a configuração com ID personalizado
function criarConfig(listId) {
  return {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://comprasegura.olx.com.br/?listId=${listId}&source=ADVIEW`,
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
      "sec-ch-ua":
        '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "upgrade-insecure-requests": "1",
      referer: "https://pa.olx.com.br/",
      cookie: `r_id=0c37e463-ec02-481e-a64b-f0a195df5965; nl_id=3760142a-67eb-430c-89ef-cba4f37c110b; l_id=9a189615-f425-4e3d-8952-f05a994d7efa; _gcl_au=1.1.761795388.1749306753; _tt_enable_cookie=1; _ttp=01JX5CXH3MJHRG76NN4S7V776E_.tt.2; _fbp=fb.2.1749306754225.217143965748204928; AdoptVisitorId=MYUwRgrAHAbBAsBaeBDAZi5AGNxEE5gYkBmNMGYfMAE2lCA=; __gsas=ID=5a7a4d56fbc9d03d:T=1749306777:RT=1749306777:S=ALNI_MYa2_UrEUu1SHotUzJxfTgmqS_u9w; _cc_id=193482ed181e153470406e0a8a964807; _hjSessionUser_1425418=eyJpZCI6ImRhMDRhZjRhLTk4OTItNTA1ZC04M2Y1LTk4NTIyYzU3MDU2MCIsImNyZWF0ZWQiOjE3NTA2MjI0MjkwOTIsImV4aXN0aW5nIjp0cnVlfQ==; _ga_E6M9NP0QM5=GS2.3.s1750622429$o1$g1$t1750622562$j60$l0$h0; _clck=3y1zg6%7C2%7Cfxt%7C0%7C2029; SMART_LOCK_STATUS=off; pbjs_sharedId=38909f1b-8bf8-4640-9118-b656bad4b1c8; pbjs_sharedId_cst=zix7LPQsHA%3D%3D; sf_utm_medium=shared_link; sf_utm_campaign=; sf_utm_content=; sf_utm_term=; panoramaId_expiry=1756149767771; panoramaId=e489a00220c404f34d0ee092ae7316d539382214027e4985818aa2a8e9ecf66d; panoramaIdType=panoIndiv; _cfuvid=y5C5lNnC5TH8hrsO.AYdAfRDemH3RIWwF5jv9hdOhGE-1755885822690-0.0.1.1-604800000; _gid=GA1.3.151299028.1755890765; ACC_LL=0|cGVyZHpvY2twYXBpZXJuaWs0MjRAb3V0bG9vay5jb20=; loginIdentifier=NTI2ODE5NmExM2ZhMjE3MGZiYjc0Y2ZjMTUwZjE4MTY6OGE4N2QxMmQyYjE1ODZkNWJiODMzZTgxMjIzODI4MDhmOWRlZjczMDg4NDFlMDQ4NTFmODBjNmFlODk1YmRlZmE2NTIyNDUyN2UyZDI5ZjNiYWVlNDEyMGFlMTc0OGFmOGE3MGJlYTZiYjA3YzFhZTBmYjhiZGIzYmVmMDgwODNmZGNjNjBjMTJlNzM0MDVkNjk3NmU5OTY0ZjY5MDQxZDFhYjViY2I5MDJkZGU4Yjc2M2NlYTdjYjFhYzQzZTY2ZTU2MjNlYmYzNzQzMjYwNmYxY2E5NGI2YjkwMjEwZjhlYjk4MWQxYjc1MWQxZWE0NjBkMzc5NmU1ZjZmZDIwOTAxMzIxYjQzZWNiNjEyZjhmMGI0MWRiMzFiNWQ4ZGU0; session_id=INCOGNIA-WEB:WBkG35JBLFIZBg1BOoG0U4xjOw89hHwAaDt-FW3vRGPSCOCljFBSu3A-DkA0-qIb6ymM4WBmlpT3CWUVqL3nXw; fp_id=INCOGNIA-WEB:WBkG35JBLFIZBg1BOoG0U4xjOw89hHwAaDt-FW3vRGPSCOCljFBSu3A-DkA0-qIb6ymM4WBmlpT3CWUVqL3nXw; userID=9cbb5da2-77d3-4cb9-ac0a-be22059df6bf; __qca=I0-512043054-1755891030459; is-webview=false; __spdt=21a87c0b9056458eba0605c854992b6f; userID=9cbb5da2-77d3-4cb9-ac0a-be22059df6bf; sf_utm_source=direct; __rtbh.uid=%7B%22eventType%22%3A%22uid%22%2C%22id%22%3A%229cbb5da2-77d3-4cb9-ac0a-be22059df6bf%22%2C%22hash%22%3A%22wBiML0Lv0cEh18cEd5DU%22%2C%22expiryDate%22%3A%222026-08-22T19%3A35%3A32.249Z%22%7D; __rtbh.lid=%7B%22eventType%22%3A%22lid%22%2C%22id%22%3A%2243LnMN33dIrUdp7IuEzf%22%2C%22expiryDate%22%3A%222026-08-22T19%3A35%3A32.250Z%22%7D; _pubcid=cf2521b4-dfd4-403d-9eeb-2fc0f072c811; _pubcid_cst=zix7LPQsHA%3D%3D; TestAB_Groups=swifakep3_control.klubirecu2_enabled.payg-discount-re-julius_ml-ranges.adv-adee01_enabled.sa-ai-fg_D.ppoplancta_control.ln-recad_control.sxp-acth_enabled.acc-tip-lg_enabled.acc-tip-sa_enabled.klubi-adv_enabled.plat-stdRE_control.sa-new-bff_A.adextrapel_enabled.sa-tradein_enabled.sanityweb50_A.frigoogll_disable.lst-re-mp_enabled.se-tipchat_A.ai-edit_control.opt-renew_enabled.acc-doc-ls_enabled.modal-ab_enabled.ppf-di-exp_enabled.bconShipRg_enabled.adv-li25c0_enabled.palqpcserv_bff.p-emp-bdge_control.cdrelPLoan_enabled.atvleadper_enabled.acc-csoci_new.earlyrnw_enabled.ln-recchat_A.ppofrautnc_control.atvleadcha_enabled.Md-shwphne_control.ad-coupon_enabled.cdrelALoan_enabled.ppofrcars_control.sellerphon_control.sellerchat_control.cdrel-gps_control; __cf_bm=_FxfvFhKnm8_xezKP022.SvOMvPqx56b0KX8MCtF9Oc-1755950300-1.0.1.1-W9ZS046ftaQz5XaN89JLiEoKFR7qTB8bLgEVQLVZTYuA7UsADI4DUTLEQMUiS0px.VpLhLTg_rPvxGBBHucgN4fmPjvKoUomZ2qpGCncbfs; pubaccid=9cbb5da2-77d3-4cb9-ac0a-be22059df6bf; s_id=e324ea2c-0648-417f-9f65-f10e4b47f23b2025-08-23T11:58:22.243961Z; __gads=ID=55d21a50ef530675:T=1749306758:RT=1755950302:S=ALNI_MZrqDwrst9tsMcWwnhd_X7zx9I5ng; __eoi=ID=5b7d4b642d84c3d6:T=1749306758:RT=1755950302:S=AA-AfjaXnKSHdWFO1TOCCW39Dbhi; _lr_env=eyJ0aW1lc3RhbXAiOjE3NTU5NTAyODY2NTEsInZlcnNpb24iOiIxLjYuMCIsImVudmVsb3BlIjoiQWdlZGstc21CTjh2Rm55T1dKTFJUUmNkamRXWlRZOEtSRGVTSWJaVHd1ZGZ3eGJUQlNPbDJBanhIOXYtOGpzUU5mcU1Ma2ZXSzFqMGU2dDJwcHJFSkZXSWhjRE5idXNvMW5KMFJBQU9fWVJDQXVlZ1FVVlBVZ2lSR2x2ZXBZNkYtUDkyTjhGNFZ6cTl4V1R2MFBvUzdQUHIyRnhpTm83dDl6bjZVdzFnNnJiMzlRWTYxT3FWUDhHUjZ0ZUJJMUx5U0szX0s5Mnd0ekU4OGJiZndLWVVhUHNUUmQzbTBtY0EydFVTZjBrd3BseVU1dEVXdkl5ZHByeXVQb01zM1FMdXlGUWtKNmU3aUtfZEdURXVkYU00aGVJbS1nbFBOdW4xN2J0WVNpTWxMVFhKSjdPdHlSS1JVaWJRZTdHNXczSjR2WlB0Q0gzRjNNMl9PVUdrODBRNF9GMEx2TzVBNlVDTWdya3lhT0dJTUdQc0RVVjRxVFd4T3YxYUN3IiwiY3JlYXRpb25UaW1lc3RhbXAiOjE3NTU4OTA4NDM0NzR9; _lr_pairId=eyJ0aW1lc3RhbXAiOjE3NTU5NTAyODY2NTMsInZlcnNpb24iOiIxLjYuMCIsImVudmVsb3BlIjpbIkF1TUtjemRnbStwNTEwVmFzOWJUNzJUQWlDYjVFOE1pdG1JN3FRMXpnN0xhIl0sImNyZWF0aW9uVGltZXN0YW1wIjoxNzU1ODkwODQzNDc2fQ%3D%3D; cf_clearance=WunrEiq8F.1jO2Lx.rejuwwhx5iuJiyKEiZD5T0edBk-1755950306-1.2.1.1-90ZYHrahozEv3rXOl4fJiuq12_9T1RDNRAuWKAyti2mUicRxfBLldpNsxcho2r6QRDmRtzNWbxSpcdC0mLXTLvSkNsZ2l888gGoy0FEYyhgIIr9IhY5zynvdWEBUWdiz6Ge1CZWB3r8GoXSnmDsg47K8Y7D3CEBdovLap2WaF_MOjwIh17rBU77QSWMu8bBbg4lniNLJH9CHQnIO0WqEeJWC2LSnkBUzCoBckRJngjg; _ga=GA1.1.1556582239.1749306754; nvg83482=164a43e3c0c7b12c48534f817510|0_236; FCNEC=%5B%5B%22AKsRol_7WRukXH7CSgms2a0Wn8G2P72y8WVPmiSpDbJKXLLk9RC3qbefV_XEx678N9mfBlkSlDLX1PvonN9CtRrkPAMI4RYqW5_3j0UHFsdgNfUXU5xP7O86CUBY5d6PR0HhPsfVjVcLtO-Nf0yicVgDxyqsV0CElQ%3D%3D%22%5D%5D; ___iat_ses=43E1DCAFEAA3A4D9; _dd_s=rum=0&expire=1755951271054; cto_bidid=dE8OwV96VHNZbjV0c2RGcjVXS09mYk9ITXZXWHFQcWNuVElpZkpCN0E0SGhXbU83ZnhSTUNSWWYxMXpiaVpidnU2OWI2eDdPM0pzNHFRMkhQY1BmWUJGdnhkSGpkcjFQUVhIUGJ3QVROV3FVcEVxayUzRA; ___iat_vis=43E1DCAFEAA3A4D9.07e747e87a9ce7d1926cbaf23edcfec7.1755950393087.b9b6e272c28b97ded9139b52f78286b3.ZBRIRRMABA.11111111.1-0.07e747e87a9ce7d1926cbaf23edcfec7; ttcsid=1755950285693::tnf0_p_eycDDnqRBiKd6.29.1755950377622; cto_bundle=6fc5qF9SJTJGSE82QXp1TGF5V0RRdEVIRUxpVTFXUG5uU3BHeEdwcyUyRnBiSjkyeWFmaUFuJTJGJTJCUldnRFJDSHRqeEEwbHlLdUNHd2V4aldCTTdEZXJiRDFVOWJyN09sVGxkMHZ2Rk4lMkZVeDZYbEZtMWxmSnVCaGpIWmVLZHElMkJqemxKamJVTTFkOEpHcjhBTlA1Z0c0YVA2aHJad1k3dWNFQ1dWNXJad1lFTkxVSFI5bkZCejNEQ1E2TnFCc2NoZ1NGRU0zR21GWSUyRmx0ZUF1Qlh5V3RyRW5jRUY2MldpQldsczJmRXc2a1E1Z3hYU3VjVFRRSXJ5ZnR2SzNUdU12NzJvUElZUnFKc1Q; ttcsid_C8LQ3HO3N5R2M2PTDC50=1755950285682::NGCBpu5UWvAfhqEBqNY_.29.1755950379197; ttcsid_CFL4LE3C77UEUGLEBCA0=1755950286099::6C1l4yxH5M3Do-mH4Stz.29.1755950379197; _ga_50C013M2CC=GS2.1.s1755950285$o37$g1$t1755950379$j45$l0$h0`, // coloque todos os cookies aqui
    },
  };
}

// Função para extrair informações do vendedor do HTML
function extrairDadosVendedor(html) {
  try {
    const $ = cheerio.load(html);

    // Procura o texto que contém o nome do vendedor e CPF
    const vendedorElement = $(
      'span.olx-text.olx-text--body-small:contains("Vendedor:")'
    );
    const cpfElement = $('span.olx-text.olx-text--body-small:contains("CPF:")');

    // Extrair o texto completo
    const vendedorTextoCompleto = vendedorElement.text().trim();
    const cpfTextoCompleto = cpfElement.text().trim();

    // Extrair apenas o nome do vendedor e CPF
    const nomeVendedor = vendedorTextoCompleto.replace("Vendedor:", "").trim();
    const cpfVendedor = cpfTextoCompleto.replace("CPF:", "").trim();

    return {
      nome: nomeVendedor,
      cpf: cpfVendedor,
    };
  } catch (error) {
    console.error("Erro ao extrair dados do vendedor:", error);
    return null;
  }
}

// Nova função para formatar os dados no formato solicitado
function formatarDadosVendedor(dados) {
  if (!dados || !dados.nome || !dados.cpf) return "/Nome3 Indisponível";

  // Extrair componentes do nome
  const partsNome = dados.nome.split(" ");
  const primeiroNome = partsNome[0] || "";

  // Obter as iniciais dos demais nomes
  let iniciais = "";
  for (let i = 1; i < partsNome.length && i <= 4; i++) {
    if (partsNome[i] && partsNome[i].length > 0) {
      iniciais += " " + partsNome[i][0].toUpperCase();
    }
  }

  // Preencher com iniciais padrão se faltarem
  while (iniciais.split(" ").length <= 4) {
    iniciais += " ";
  }

  // Extrair números do CPF (primeiros 6 dígitos ou o que estiver disponível)
  const numerosCpf = dados.cpf.replace(/\D/g, "").substring(0, 6);

  return `/Nome3 ${primeiroNome}${iniciais}${numerosCpf}`;
}

// Nova função para buscar informações com ID personalizado
async function buscarInfoComId(listId) {
  try {
    const novaConfig = criarConfig(listId);
    const response = await axios.request(novaConfig);

    // Extrai os dados do vendedor
    const dadosVendedor = extrairDadosVendedor(response.data);

    if (dadosVendedor) {
      const dadosFormatados = formatarDadosVendedor(dadosVendedor);

      return {
        dadosOriginais: dadosVendedor,
        dadosFormatados: dadosFormatados,
      };
    } else {
      console.log(`Não foi possível extrair dados do anúncio ${listId}`);
      return null;
    }
  } catch (error) {
    console.error(
      `Erro ao buscar informações para o anúncio ${listId}:`,
      error.message
    );
    return null;
  }
}

// Exporta a função para ser usada por outros scripts
module.exports = {
  buscarInfoComId,
  formatarDadosVendedor,
  extrairDadosVendedor,
};

