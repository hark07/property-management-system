import { FaBuilding, FaUsers, FaMoneyBillWave, FaTools } from "react-icons/fa";

import Layout from "../../components/layout/Layout";

const Dashboard = () => {
  const cards = [
    {
      title: "Total Properties",
      value: 120,
      icon: <FaBuilding />,
    },

    {
      title: "Total Tenants",
      value: 85,
      icon: <FaUsers />,
    },

    {
      title: "Pending Payments",
      value: 12,
      icon: <FaMoneyBillWave />,
    },

    {
      title: "Maintenance Requests",
      value: 8,
      icon: <FaTools />,
    },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Tenant Dashboard
        </h1>

        <p
          className="
          text-gray-500
          mt-2
        "
        >
          Overview of your rental management system.
        </p>
      </div>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="
              bg-white
              rounded-xl
              shadow
              p-6
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p
                className="
                text-gray-500
                text-sm
              "
              >
                {card.title}
              </p>

              <h2
                className="
                text-3xl
                font-bold
                mt-2
              "
              >
                {card.value}
              </h2>
            </div>

            <div
              className="
              text-3xl
              text-blue-600
            "
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-6
        mt-6
      "
      >
        <h2
          className="
          text-xl
          font-semibold
          mb-4
        "
        >
          Recent Activities
        </h2>

        <ul
          className="
          space-y-3
          text-gray-600
        "
        >
          <li>New tenant registered.</li>

          <li>Rent payment received.</li>

          <li>Maintenance request submitted.</li>

          <li>Property status updated.</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Dashboard;
