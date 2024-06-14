import { Head, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { GiPayMoney } from "react-icons/gi";
import { Kpi } from "@/Components/Kpis";
import { MoneyptBR } from "@/Components/Money";
import { AiOutlineDashboard, AiOutlineLineChart } from "react-icons/ai";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { HeaderContent, TitleTop } from "@/Components/PageTop";
import { IoIosBusiness } from 'react-icons/io';
import Progress from '@/Components/Charts/Progress';
import CHFaturamento from "@/Components/Charts/CHFaturamento";
import DatePickerSingle from "@/Components/DatePicker/DatePickerSingle";
import { useEffect } from 'react';
import { useAuthContext } from '@/Contexts';
import moment from 'moment';
import { IoInformationCircle } from "react-icons/io5";


const Home = ({ companies, totalsday, saleschart }: any) => {
  const { auth } = usePage().props as any;
  const { dataFiltro, executeFilter, setExecuteFilter } = useAuthContext();

  useEffect(() => {
    const getDataHome = () => {
      if (executeFilter) {
        router.get('/',
          { 'dt': moment(dataFiltro).format('YYYYMMDD') })
      }
      setExecuteFilter(false);
    };
    getDataHome();
  }, [dataFiltro, executeFilter]);

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <main className=''>
          {auth?.user?.company_id !== null &&
            <>
              <div className="flex items-center justify-start p-1 bg-automa-green-primary rounded-md md:shadow-md shadow-sm border border-automa-green-secundary">
                <DatePickerSingle url="dashboard" />
              </div>
              {!totalsday &&
              <div className="bg-cyan-600 text-white flex items-center justify-start rounded-md shadow-sm md:mt-4 mt-2 py-2 px-3">
                <IoInformationCircle size={25} /><span className="text-sm ml-2">Não há dados a serem mostrados no momento</span>
              </div>
              }
              {totalsday &&
                <div className="grid md:gap-4 gap-2 md:grid-cols-4 grid-cols-2 md:mt-4 mt-2">
                  <Kpi icon={<AiOutlineLineChart />} iconcolor="text-blue-700" title="Meta" value={MoneyptBR(totalsday?.valmeta)} bgcolor="bg-blue-200" textcolor="text-blue-700" />
                  <Kpi icon={<GiPayMoney />} iconcolor="text-green-700" title="Faturamento" value={MoneyptBR(totalsday?.valven)} bgcolor="bg-green-200" textcolor="text-green-700" />
                  <Kpi icon={<FaMoneyBillTrendUp />} iconcolor="text-yellow-700" title="Val. Juros" value={MoneyptBR(totalsday?.valjur)} bgcolor="bg-green-200" textcolor="text-green-700" />
                  <Kpi icon={<FaMoneyBillTrendUp />} iconcolor="text-yellow-700" title="Val. Ina." value={MoneyptBR(totalsday?.valina)} bgcolor="bg-green-200" textcolor="text-green-700" />
                </div>
              }
              {totalsday &&
                <div className="grid md:gap-4 gap-2 md:grid-cols-4 grid-cols-2 md:mt-4 mt-2">
                  <div className='bg-white p-4 shadow-md rounded-md'>
                    <Progress value={totalsday?.permet} colorBar="#FF5003" colorText="#FF5003" title='Meta' height={100} />
                  </div>
                  <div className='bg-white p-4 shadow-md rounded-md'>
                    <Progress value={totalsday?.margem} colorBar="#CA0156" colorText="#CA0156" title='Margem' height={100} />
                  </div>
                  <div className='bg-white p-4 shadow-md rounded-md'>
                    <Progress value={totalsday?.perjur} colorBar="#0F52BA" colorText="#0F52BA" title='Juros' height={100} />
                  </div>
                  <div className='bg-white p-4 shadow-md rounded-md'>
                    <Progress value={totalsday?.perina} colorBar="#FFAE08" colorText="#FFAE08" title='Inadimplência' height={100} />
                  </div>
                </div>
              }
              {saleschart?.length > 0 &&
                <div className="md:mt-4 mt-2 p-2 flex flex-col bg-white rounded-md shadow-md">
                  <CHFaturamento data={saleschart} />
                </div>
              }
            </>
          }

          {auth?.user?.company_id === null &&
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Kpi icon={<IoIosBusiness size="50" />} iconcolor="text-blue-700" title="Empresas ativas" value={companies} bgcolor="bg-blue-200" textcolor="text-blue-700" />
              {/* <Kpi icon={<AiOutlineLineChart size="50" />} iconcolor="text-blue-700" title="Meta" value={MoneyptBR(goals?.valormeta)} bgcolor="bg-blue-200" textcolor="text-blue-700" />
              <Kpi icon={<GiPayMoney size="50" />} iconcolor="text-green-700" title="Faturamento" value={MoneyptBR(goals?.faturamento)} bgcolor="bg-green-200" textcolor="text-green-700" />
              <Kpi icon={<FaMoneyBillTrendUp size="50" />} iconcolor="text-yellow-700" title="Representa" value={ValuePercent(goals?.faturamento/goals?.valormeta)} bgcolor="bg-green-200" textcolor="text-green-700" /> */}
            </div>
          }
      </main>
    </AuthenticatedLayout>
  )
}

export default Home