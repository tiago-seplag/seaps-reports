import { Footer } from "../ui/footer";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Bad, Good, NA, Regular } from "../ui/icons";
import { TableCell, TableHead } from "../ui/table/table";
import { Indicator } from "../ui/indicator";

const Report = ({ title, content }) => {
  const formatPhone = (str) => {
    if (str) {
      const phone = str.replace(/\D/g, ""); // remove caracteres não numéricos

      return phone.length <= 10
        ? phone
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2")
        : phone
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{1})(\d{4})(\d)/, "$1 $2-$3")
            .slice(0, 16);
    }

    return "--";
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold mb-2">
        CHECK-LIST MANUTENÇÃO PREDIAL
      </h1>
      <Card className={"mb-2"}>
        <div className="border-b border-blue-800 inline-flex w-full">
          <Label title={"ÓRGÃO"}>{data.organization.name}</Label>
          <Label title={"UNIDADE ADMINISTRATIVA"}>{data.property.name}</Label>
        </div>
        <div className="border-b border-blue-800 inline-flex w-full">
          <Label title={"RESPONSÁVEL PELA UNIDADE"}>
            {data.property.person.name}
          </Label>
        </div>
        <div className="border-b border-blue-800 inline-flex w-full">
          <Label title={"CARGO"}>{data.property.person.role}</Label>
          <Label title={"TEL."}>
            {formatPhone(data.property.person.phone)}
          </Label>
        </div>
        <div className="border-b border-blue-800 inline-flex w-full">
          <Label title={"ENDEREÇO"} className={"text-wrap line-clamp-2"}>
            {data.property.address}
          </Label>
        </div>
      </Card>
      <Card className={"mb-2"}>
        <table className="w-full [&_tr:last-child]:border-0">
          <thead>
            <tr>
              <TableHead></TableHead>
              <TableHead className="text-center">
                <Good />
                BOM
              </TableHead>
              <TableHead className="text-center">
                <Regular />
                REGULAR
              </TableHead>
              <TableHead className="text-center">
                <Bad />
                RUIM
              </TableHead>
              <TableHead className="text-center">
                <NA />
                N/A
              </TableHead>
            </tr>
          </thead>
          <tbody>
            {data.checklistItems.map((item) => (
              <tr key={item.id} className="border-b border-blue-800 ">
                <TableCell width="60%">{item.item.name}</TableCell>
                <TableCell className="text-center">
                  <input
                    disabled
                    type="radio"
                    value="bom"
                    checked={item.score === 3}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    disabled
                    type="radio"
                    value="regular"
                    checked={item.score === 1}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    disabled
                    type="radio"
                    value="ruim"
                    checked={item.score === -2}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    disabled
                    type="radio"
                    value="ruim"
                    checked={item.score === 0}
                  />
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Indicator score={data.score} />
      <Card>
        <div className="border-b border-blue-800 inline-flex w-full">
          <Label title={"RESPONSÁVEL PELA FISCALIZAÇÃO"}>
            {data.user.name}
          </Label>
        </div>
        <div className="border-b border-blue-800 inline-flex w-full">
          <Label title={"CARGO"}>GESTÃO DE PATRIMÔNIO</Label>
          <Label title={"DATA"}>
            {new Date(data.finished_at).toLocaleDateString("pt-BR")}
          </Label>
          <Label className={"flex-0 font-mono"} title={"ASSINATURA"}>
            DIGITAL
          </Label>
        </div>
      </Card>
      <Footer />
    </>
  );
};

export { Report };

const data = {
  id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
  sid: "0006/25",
  status: "CLOSED",
  organization_id: "8e6df8fe-713b-4210-b2dc-c892f81dcd44",
  model_id: "ecc20d62-4c74-46f8-bd78-7405a390bedd",
  property_id: "142e09dd-3496-4c78-b5d5-d415af79702a",
  user_id: "197967dc-b555-4bc4-8d35-24ed883b09ab",
  created_by: null,
  person_id: null,
  score: 1.764705882352941,
  classification: 1,
  finished_at: "2025-04-30T18:00:46.723Z",
  created_at: "2025-02-20T18:15:18.067Z",
  updated_at: "2025-04-30T18:00:46.725Z",
  property: {
    id: "142e09dd-3496-4c78-b5d5-d415af79702a",
    organization_id: "8e6df8fe-713b-4210-b2dc-c892f81dcd44",
    person_id: "14e22d55-7eef-4c6e-a435-91137c261531",
    name: "Prédio SEAPS/SAPGD",
    address: "Rua mistral, 457 - Jardim Bom Clima",
    type: "GRANT",
    location: null,
    created_at: "2025-02-19T15:05:28.364Z",
    updated_at: "2025-02-25T18:31:36.461Z",
    person: {
      id: "14e22d55-7eef-4c6e-a435-91137c261531",
      organization_id: "8e6df8fe-713b-4210-b2dc-c892f81dcd44",
      name: "Responsavel SEPLAG",
      email: "email@email.com",
      phone: "(12) 3 5131-2323",
      role: "Cargo",
      created_at: "2025-02-21T12:41:24.800Z",
      updated_at: "2025-02-21T12:57:43.537Z",
    },
    organization: {
      id: "8e6df8fe-713b-4210-b2dc-c892f81dcd44",
      name: "SEPLAG",
    },
  },
  organization: {
    id: "8e6df8fe-713b-4210-b2dc-c892f81dcd44",
    name: "SEPLAG",
  },
  person: null,
  user: {
    id: "197967dc-b555-4bc4-8d35-24ed883b09ab",
    name: "TIAGO DANILO DE MATOS BANKOW",
    email: "tiagobankow@seplag.mt.gov.br",
    cpf: "01239070128",
    password: "$2b$10$lFG8LaoLmHxzeo9x/B5VNenQuM0R1P86Qa0pXcnA0BFHQMLM.cn6G",
    avatar: null,
    role: "ADMIN",
    is_active: true,
    is_deleted: false,
    created_at: "2025-02-21T15:30:03.094Z",
    updated_at: "2025-05-12T16:35:42.826Z",
  },
  checklistItems: [
    {
      id: "6a08d185-5409-47ff-883d-c3e4af9acc67",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "1a9dd061-2244-4414-b9df-c8d72b80fd38",
      score: -2,
      observation:
        "banheiro com janela que abre para despensa de trás da cozinha. ralo do banheiro tampado com papel higiênico. bomba do vaso sanitário com vazamento, contribuindo para a interdição do banheiro e com a falta de água no prédio.",
      image: "/images/images/703aa035f9b0497b906f7baec6c43ef0jpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-03-25T13:41:44.298Z",
      item: {
        id: "1a9dd061-2244-4414-b9df-c8d72b80fd38",
        item_id: null,
        level: 0,
        name: "BANHEIROS",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "c6bc6120-1f40-4ddf-9b89-89ba1a11c7de",
          checklist_item_id: "6a08d185-5409-47ff-883d-c3e4af9acc67",
          image: "/images/images/703aa035f9b0497b906f7baec6c43ef0jpeg",
          observation: null,
          created_at: "2025-02-20T18:55:33.545Z",
        },
      ],
    },
    {
      id: "3694f56a-3da3-4bf1-92ee-edbe5ab0deed",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "b14b1e6f-e54b-47e8-8eb2-f63881833c66",
      score: 3,
      observation:
        "portão de acesso com pequena falha de encaixe, eventualmente a máquina fica emperrada e impede a entrada/saída dos veículos oficiais abrigados no prédio.",
      image: "/images/images/b8bd15e896564f65a9c9db8953d2f8f6jpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-02-27T15:12:54.908Z",
      item: {
        id: "b14b1e6f-e54b-47e8-8eb2-f63881833c66",
        item_id: null,
        level: 0,
        name: "CERCAMENTO",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "e03d80ae-c04c-4250-b8ef-6b828ccef5bd",
          checklist_item_id: "3694f56a-3da3-4bf1-92ee-edbe5ab0deed",
          image: "/images/images/b8bd15e896564f65a9c9db8953d2f8f6jpeg",
          observation: null,
          created_at: "2025-02-20T19:12:21.628Z",
        },
      ],
    },
    {
      id: "02884760-f29c-47d1-8773-4a7e8f037d07",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "64da3daf-aea8-427d-b087-dc1f1ec25005",
      score: 3,
      observation:
        "ares condicionados instalados sem capacidade elétrica do prédio para a sua utilização. drenos com pequenas infiltrações na parte interna. na parte externa do dreno, saída de água acumulando lodo.",
      image: "/images/images/e78bbb20632e40418fbdaa1d12d7479cjpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-03-13T18:26:19.384Z",
      item: {
        id: "64da3daf-aea8-427d-b087-dc1f1ec25005",
        item_id: null,
        level: 0,
        name: "CONDICIONADORES DE AR",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "22585c4c-7c67-49bc-910b-09418e81fc60",
          checklist_item_id: "02884760-f29c-47d1-8773-4a7e8f037d07",
          image: "/images/images/e78bbb20632e40418fbdaa1d12d7479cjpeg",
          observation: null,
          created_at: "2025-02-20T19:10:28.305Z",
        },
      ],
    },
    {
      id: "54875204-55ce-454a-a60f-bbc5e31c607c",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "8ae603b8-62b3-4888-bb4e-474edb42307f",
      score: 1,
      observation:
        "janela em frente à pia que dá na despensa; ar condicionado não resfria adequadamente. pisos manchados",
      image: "/images/images/dbf251f0cde64145b0e4fbbac50f8809jpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-03-25T15:15:31.249Z",
      item: {
        id: "8ae603b8-62b3-4888-bb4e-474edb42307f",
        item_id: null,
        level: 0,
        name: "COZINHA / CANTINA",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "e0a8971c-73da-41e6-9c3a-f32a3eac4dab",
          checklist_item_id: "54875204-55ce-454a-a60f-bbc5e31c607c",
          image: "/images/images/dbf251f0cde64145b0e4fbbac50f8809jpeg",
          observation: null,
          created_at: "2025-02-20T19:00:15.596Z",
        },
      ],
    },
    {
      id: "7ddb7895-3592-4673-898c-ef3d65558681",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "2a79d167-d2fb-4e8b-93fa-c2dfb2b9b778",
      score: 3,
      observation:
        "equipamentos de informática em todas as ilhas e mesas, e em funcionamento.",
      image: "/images/images/b81838ec042949db988c56474b561fb3jpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-02-20T19:19:11.379Z",
      item: {
        id: "2a79d167-d2fb-4e8b-93fa-c2dfb2b9b778",
        item_id: null,
        level: 0,
        name: "EQUIPAMENTOS DE INFORMÁTICA",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "131052cb-5e23-49fe-a386-76da20051127",
          checklist_item_id: "7ddb7895-3592-4673-898c-ef3d65558681",
          image: "/images/images/b81838ec042949db988c56474b561fb3jpeg",
          observation: null,
          created_at: "2025-02-20T19:17:31.621Z",
        },
      ],
    },
    {
      id: "9a230ccd-a1f9-4e60-b74e-e9642c0b9b89",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "8d7a1673-8ada-4a18-b2c8-9b0839a5306c",
      score: 3,
      observation:
        "escada com adesivo antiaderente fixado; corrimãos fixos. iluminação em todos os andares da escadaria.",
      image: "/images/images/2cb6ba69f8604bdd8ca26bab4ed47d1fjpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-03-25T13:21:42.173Z",
      item: {
        id: "8d7a1673-8ada-4a18-b2c8-9b0839a5306c",
        item_id: null,
        level: 0,
        name: "ESCADAS",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "6a40854b-6835-452d-b98a-e048e325f926",
          checklist_item_id: "9a230ccd-a1f9-4e60-b74e-e9642c0b9b89",
          image: "/images/images/2cb6ba69f8604bdd8ca26bab4ed47d1fjpeg",
          observation: null,
          created_at: "2025-02-20T19:03:20.459Z",
        },
      ],
    },
    {
      id: "4328b5a5-b7e0-4b65-a6fc-e073dd36fdd2",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "7a340d36-3c46-4c25-a452-42cfb5da91eb",
      score: 3,
      observation:
        "pele de vidro em bom estado. placa de identificação do órgão também de acordo.",
      image: "/images/images/edb2b449cee64ee99f6b9ec3554ad18cjpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-03-06T18:58:46.808Z",
      item: {
        id: "7a340d36-3c46-4c25-a452-42cfb5da91eb",
        item_id: null,
        level: 0,
        name: "FACHADA",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "ca4dd483-55f4-4fa3-a548-cdf37ac25a47",
          checklist_item_id: "4328b5a5-b7e0-4b65-a6fc-e073dd36fdd2",
          image: "/images/images/edb2b449cee64ee99f6b9ec3554ad18cjpeg",
          observation: null,
          created_at: "2025-02-20T18:22:01.387Z",
        },
      ],
    },
    {
      id: "6241888f-1742-435f-94d3-56133662e816",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "557e5c78-c812-40f2-8e64-ee1f155fb5d8",
      score: 3,
      observation: "todas as lâmpadas funcionando. fiação à mostra.",
      image: "/images/images/594a7a115da34d368e9d8c6bf58d82e6jpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-03-25T13:22:07.360Z",
      item: {
        id: "557e5c78-c812-40f2-8e64-ee1f155fb5d8",
        item_id: null,
        level: 0,
        name: "ILUMINAÇÃO",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "4c3031d6-f9e7-43bc-b0f9-24fbba2528cf",
          checklist_item_id: "6241888f-1742-435f-94d3-56133662e816",
          image: "/images/images/594a7a115da34d368e9d8c6bf58d82e6jpeg",
          observation: null,
          created_at: "2025-02-20T19:02:40.774Z",
        },
      ],
    },
    {
      id: "45ed4070-ea36-48d8-9ed1-4f46e4b8d7b1",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "46c5aef6-13d6-4fc7-957a-637593a59c82",
      score: -2,
      observation:
        "o espaço de grama interno é utilizado para armazenar lixo e esporadicamente, garagem.",
      image: "/images/images/57a2615e55bb49c5ac6ab2dcfbd2af32jpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-03-25T13:41:11.101Z",
      item: {
        id: "46c5aef6-13d6-4fc7-957a-637593a59c82",
        item_id: null,
        level: 0,
        name: "JARDINAGEM",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "6e32026f-d116-417e-8cfc-6a782b874eb7",
          checklist_item_id: "45ed4070-ea36-48d8-9ed1-4f46e4b8d7b1",
          image: "/images/images/57a2615e55bb49c5ac6ab2dcfbd2af32jpeg",
          observation: null,
          created_at: "2025-02-20T18:54:27.380Z",
        },
      ],
    },
    {
      id: "24868e37-fa50-46ef-bf2a-56fa8a27ae58",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "d9877d60-73cf-4620-a17f-cb3293e12c60",
      score: 3,
      observation:
        "entorno limpo, sem entulhos, resíduos ou qualquer objeto que impeça ou dificulte o acesso da repartição.",
      image: "/images/images/0853e1a845f946168da6dcfaee240e60jpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-02-20T19:19:30.294Z",
      item: {
        id: "d9877d60-73cf-4620-a17f-cb3293e12c60",
        item_id: null,
        level: 0,
        name: "LIMPEZA ENTORNO DO IMÓVEL",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "5ac1c8ef-1f48-46af-ab4b-3b899df68aeb",
          checklist_item_id: "24868e37-fa50-46ef-bf2a-56fa8a27ae58",
          image: "/images/images/0853e1a845f946168da6dcfaee240e60jpeg",
          observation: null,
          created_at: "2025-02-20T19:04:54.752Z",
        },
      ],
    },
    {
      id: "8b56467f-877b-462d-ad30-54180b6f0e62",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "a4e827aa-ee59-4137-b941-1b9bc4719a54",
      score: 3,
      observation: "pisos e paredes limpas e secas.",
      image: "/images/images/71ef6282acec475cb4750bfc0cffe03djpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-02-20T19:19:54.210Z",
      item: {
        id: "a4e827aa-ee59-4137-b941-1b9bc4719a54",
        item_id: null,
        level: 0,
        name: "LIMPEZA INTERNA",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "3141e7af-ed81-4f1f-ae58-bd63e7b7e8d9",
          checklist_item_id: "8b56467f-877b-462d-ad30-54180b6f0e62",
          image: "/images/images/9d1ff23d4a794d088f043b6bfed66c0bjpeg",
          observation: null,
          created_at: "2025-02-20T18:53:00.681Z",
        },
        {
          id: "93b0686e-29b4-49d7-b85d-026cdb0c9e67",
          checklist_item_id: "8b56467f-877b-462d-ad30-54180b6f0e62",
          image: "/images/images/71ef6282acec475cb4750bfc0cffe03djpeg",
          observation: null,
          created_at: "2025-02-20T18:53:11.353Z",
        },
      ],
    },
    {
      id: "fec4308c-8dc5-43e6-94b3-1797794d76e1",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "e35bef42-4e35-41cb-855e-8b51c2cb6ef0",
      score: 1,
      observation: "mobiliário antigo e sem padronização.",
      image: "/images/images/8d2f2bb48d654dab97241d360255d87cjpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-04-30T12:48:29.442Z",
      item: {
        id: "e35bef42-4e35-41cb-855e-8b51c2cb6ef0",
        item_id: null,
        level: 0,
        name: "MÓVEIS",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "d343df65-55b9-4267-84ba-237ba962d869",
          checklist_item_id: "fec4308c-8dc5-43e6-94b3-1797794d76e1",
          image: "/images/images/8d2f2bb48d654dab97241d360255d87cjpeg",
          observation: null,
          created_at: "2025-02-20T19:16:25.027Z",
        },
      ],
    },
    {
      id: "d5115d01-55e0-4991-a7e6-f0a79dd99487",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "f71fc559-9632-43b6-81c1-ed5a5542c421",
      score: 3,
      observation:
        "pinturas sem descascar, poucas marcas/manchas de mesas, cadeiras e batidas nas paredes.",
      image: "/images/images/bebd45f2333348b79fe6895b9f3ba78ejpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-03-06T18:58:53.596Z",
      item: {
        id: "f71fc559-9632-43b6-81c1-ed5a5542c421",
        item_id: null,
        level: 0,
        name: "PINTURAS",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "e49d94fe-ce6a-445d-b866-0b11f3f6b12f",
          checklist_item_id: "d5115d01-55e0-4991-a7e6-f0a79dd99487",
          image: "/images/images/bebd45f2333348b79fe6895b9f3ba78ejpeg",
          observation: null,
          created_at: "2025-02-20T18:27:58.060Z",
        },
      ],
    },
    {
      id: "4ab36f1a-17c7-4ba7-aab6-812f81bf82bc",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "267621a1-9efe-40cb-9af8-5df075a1a55f",
      score: 3,
      observation:
        "calçada com lodo; piso tátil para cegos incompleto (não guia para a entrada da repartição).",
      image: "/images/images/a7f5f24446824300981d6e4a9560ff44jpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-03-25T13:45:20.222Z",
      item: {
        id: "267621a1-9efe-40cb-9af8-5df075a1a55f",
        item_id: null,
        level: 0,
        name: "PISOS E CALÇADAS",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "2dc2fa79-7087-4c91-aca6-4de9230a4acd",
          checklist_item_id: "4ab36f1a-17c7-4ba7-aab6-812f81bf82bc",
          image: "/images/images/a7f5f24446824300981d6e4a9560ff44jpeg",
          observation: null,
          created_at: "2025-02-20T18:29:26.574Z",
        },
      ],
    },
    {
      id: "b56141e6-9f96-4ed5-b635-f3fde522336b",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "061e2f5b-bf47-43f4-b9a4-b143dfe411cf",
      score: -2,
      observation:
        "portão de acesso do prédio com facial constantemente sem funcionamento.",
      image: "/images/images/9a68a7a7d831417f93756317710d73ebjpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-03-25T13:42:23.616Z",
      item: {
        id: "061e2f5b-bf47-43f4-b9a4-b143dfe411cf",
        item_id: null,
        level: 0,
        name: "PORTAS E JANELAS",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "db78ee86-bb72-40bb-ad6a-3099eeff476a",
          checklist_item_id: "b56141e6-9f96-4ed5-b635-f3fde522336b",
          image: "/images/images/9a68a7a7d831417f93756317710d73ebjpeg",
          observation: null,
          created_at: "2025-02-20T19:06:19.199Z",
        },
      ],
    },
    {
      id: "cdfcd69d-a73b-461e-901a-2b6347821f28",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "e6044977-db6f-4448-80dd-a676ff15feb3",
      score: 1,
      observation:
        "espaço improvisado e aberto. nos dias quentes, faz muito calor, nos dias de chuva, inviabiliza a utilização integral do espaço. mesas, cadeiras e micro-ondas antigas.",
      image: "/images/images/010ce4823b644f59a0f2cee07483c529jpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-04-30T12:48:29.020Z",
      item: {
        id: "e6044977-db6f-4448-80dd-a676ff15feb3",
        item_id: null,
        level: 0,
        name: "REFEITÓRIO",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "1db69630-bc50-48f6-83e5-eb437107fb92",
          checklist_item_id: "cdfcd69d-a73b-461e-901a-2b6347821f28",
          image: "/images/images/010ce4823b644f59a0f2cee07483c529jpeg",
          observation: null,
          created_at: "2025-02-20T19:13:52.089Z",
        },
      ],
    },
    {
      id: "138d73b4-52e9-40af-a207-2ea20d1da7ec",
      checklist_id: "03ac2c14-4d5b-4b27-81da-ec03b67daa58",
      item_id: "a50e0542-f929-4488-9dd8-bf1862564ffa",
      score: 3,
      observation: "bens de consumo e utensílios em estoque.",
      image: "/images/images/391a3070c7b648079b1b333db1340e7bjpeg",
      is_inspected: true,
      created_at: "2025-02-20T18:15:18.083Z",
      updated_at: "2025-02-20T19:19:15.213Z",
      item: {
        id: "a50e0542-f929-4488-9dd8-bf1862564ffa",
        item_id: null,
        level: 0,
        name: "UTENSÍLIOS",
        is_deleted: false,
        created_at: "2025-02-19T15:03:56.501Z",
        updated_at: "2025-02-19T15:03:56.501Z",
      },
      images: [
        {
          id: "6c1dd107-bf1f-489b-969a-a1b20a82ecb3",
          checklist_item_id: "138d73b4-52e9-40af-a207-2ea20d1da7ec",
          image: "/images/images/391a3070c7b648079b1b333db1340e7bjpeg",
          observation: null,
          created_at: "2025-02-20T19:16:57.111Z",
        },
      ],
    },
  ],
};
