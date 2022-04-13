import React from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import { Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";


export default function TermsConditions() {
  return (
    <Card>
      <Row style={{ marginRight: "40px", marginTop: "35px" }}>
        <Col span={4}>
          <Tooltip title="Privacy">
            <Button shape="circle" icon={<EyeOutlined />} size="large" />
          </Tooltip>
        </Col>
        <Col span={18}>
          <b style={{ justifyContent: "left", display: "flex" }}>Privacy</b>
          <p style={{ textAlign: "start" }}>
            All your personal data and training information will never be shared
            with any 3rd parties and will never be used for marketing without
            your consent.
          </p>
        </Col>
      </Row>
    </Card>
  );
}
