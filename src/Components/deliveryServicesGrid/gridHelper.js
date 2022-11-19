import { Tag } from "antd";
import { Filters } from "./DsGrid";

export const createRows = (data) => {
  const allRows = [];
  data.forEach((row) => {
    let metaData = row.metadata;
    let contentGroupId = row.contentGroupId;

    for (const deliveryService of row.DS) {
      let certificateStatus = exiprationStatusClassifier(
        deliveryService.certificateExpiration
      );
      let newRow = {
        serviceToken: deliveryService.serviceToken,
        CDN: deliveryService.cdns,
        Networks: deliveryService.ispName,
        deliveryServiceName: deliveryService.ds_name,
        routingMethod: deliveryService.routingMethod,
        playbookLink: deliveryService.playbookLink,
        certificateExpiration: deliveryService.certificateExpiration,
        metadata: metaData,
        contentGroupId: contentGroupId,
        expirationStatus: certificateStatus,
        callRecords: detailGridDataProvider(
          deliveryService.certificateExpiration
        ),
      };
      allRows.push(newRow);
    }
  });
  return allRows;
};

export const expirationDateCellRenderer = (certificate) => {
  let daysToExpire = calcDaysToExpire(certificate);
  return tagsClassifier(daysToExpire, certificate);
};

export const detailGridDataProvider = (certificates) => {
  let detailGridRows = [];
  if (!certificates) {
    return {
      Domain: "N/A",
      expirationDate: "N/A",
    };
  } else {
    certificates.forEach((certificate) => {
      let newRow = {
        Domain: certificate.domain ?? "N/A",
        expirationDate: certificate.value ?? "N/A",
      };
      detailGridRows.push(newRow);
    });
    return detailGridRows;
  }
};

export const calcDaysToExpire = (certificate) => {
  let expirationDate = new Date(certificate.value);
  let currentDate = new Date();
  let differrence = expirationDate - currentDate;
  let daysToExpire = Math.round(differrence / (1000 * 3600 * 24));
  return daysToExpire;
};

export const exiprationStatusClassifier = (certificates) => {
  let listDaysToExpire = [];
  if (!certificates) {
    return <Tag color={Filters.GRAY}> N/A</Tag>;
  } else {
    certificates.forEach((cert) => {
      listDaysToExpire.push(calcDaysToExpire(cert));
    });

    const daysToExpireWorstCase = Math.min(...listDaysToExpire);
    listDaysToExpire = [];
    return tagsClassifier(daysToExpireWorstCase);
  }
};

export const tagsClassifier = (daysToExpire, certificate) => {
  if (daysToExpire < 0) {
    if (certificate) {
      return (
        <Tag color={Filters.RED}>
          {certificate.value} ({Math.abs(daysToExpire)}d ago)
        </Tag>
      );
    } else {
      return <Tag color={Filters.RED}>Exp. {Math.abs(daysToExpire)}d ago</Tag>;
    }
  }

  if (daysToExpire >= 0 && daysToExpire < 7) {
    if (certificate) {
      return (
        <Tag color={Filters.RED}>
          {certificate.value} (in {daysToExpire}d)
        </Tag>
      );
    } else {
      return <Tag color={Filters.RED}> Exp. in {daysToExpire}d</Tag>;
    }
  }

  if (daysToExpire >= 7 && daysToExpire < 30) {
    if (certificate) {
      return (
        <Tag color={Filters.ORANGE}>
          {certificate.value} (in {daysToExpire}d)
        </Tag>
      );
    } else {
      return <Tag color={Filters.ORANGE}> Exp. in {daysToExpire}d</Tag>;
    }
  }

  if (daysToExpire > 30) {
    if (certificate) {
      return (
        <Tag color={Filters.GREEN}>
          {certificate.value} (in {daysToExpire}d)
        </Tag>
      );
    } else {
      return <Tag color={Filters.GREEN}> Exp. in {daysToExpire}d</Tag>;
    }
  }
};
