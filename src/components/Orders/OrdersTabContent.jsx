// OrdersTabContent.js
import React from "react";
import OrderDetailsCard from "./OrderDetailsCard";
import PropTypes from "prop-types";

const OrdersTabContent = ({ title, data }) => {
  return (
    <section className="section">
      <h3 className="font-semibold  text-base text-black-700 my-4  ">
        {title}
      </h3>
      {data.map((item, index) => (
        <OrderDetailsCard
          key={index}
          image={item.image}
          title={item.title}
          description={item.description}
          actions={item.actions}
          tableData={item.tableData}
          tableColumns={item.tableColumns}
          showAccordionIcon={item.showAccordionIcon || false}
        />
      ))}
    </section>
  );
};

OrdersTabContent.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      actions: PropTypes.arrayOf(PropTypes.string),
      tableData: PropTypes.array,
      tableColumns: PropTypes.array,
      showAccordionIcon: PropTypes.bool,
    })
  ).isRequired,
};

export default OrdersTabContent;
