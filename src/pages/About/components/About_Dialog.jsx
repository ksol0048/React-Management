import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isDialogOpen, isEditDialog } from "../../states/page_atoms";
import Dialog from "../../../components/Dialog";
import axios from "axios";
/**
 * 공정관리 - 설비관리 다이얼로그
 * @param {function} callback1 - onConfirm(): query 된 상태 그대로 새로고침
 * @param {function} callback2 - onInit(): query 없는 상태로 새로고침
 * @param {Object} activeRowData - 선택 된 데이터 리스트
 */
function AboutDialog({ callback, callback2, activeRowData }) {
  const [dialog, setDialog] = useRecoilState(isDialogOpen);
  const [isEdit, setIsEdit] = useRecoilState(isEditDialog);
  const [isError, setIsError] = useState(true);
  const [inputs, setInputs] = useState({
    code: "",
    company: "",
    price: "",
    change: "",
    changePrecent: "",
    start_date: "",
  });

  const inputProps = [
    { title: "Company *", name: "company", type: "text" },
    { title: "Price *", name: "price", type: "text" },
    { title: "Change *", name: "change", type: "text" },
    { title: "Change(%) *", name: "changePrecent", type: "text" },
    { title: "등록일 *", name: "start_date", type: "date" }

  ];

  // const smallInputProps = [
  //   {
  //     title: "거래처/부서명 *",
  //     element: [
  //       { title: "거래처", name: "account", type: "text" },
  //       { title: "부서명", name: "sub_buy_manager", type: "text" },
  //     ],
  //   },
  //   {
  //     title: "사업자번호/대표자 *",
  //     element: [
  //       { title: "사업자번호", name: "buy_buy_manager", type: "text" },
  //       { title: "대표자", name: "buy_manager_phone", type: "text" },
  //     ],
  //   },
  // ];

  const resetData = () => {
    setIsEdit(false);
    setIsError(true);
    setInputs({
      code: "",
      company: "",
      price: "",
      change: "",
      changePrecent: "",
      start_date: "",
    });
  };

  useEffect(() => {
    if (isEdit) {
      const tempData = { ...activeRowData };
      setIsError(false);
      setInputs({
        code: tempData.code,
        company: tempData.company,
        price: tempData.price,
        change: tempData.change,
        changePrecent: tempData.changePrecent,
        start_date: tempData.start_date,
      });
    }
  }, [isEdit]);

  const onConfirm = () => {
    axios.post('http://localhost:8080/inserttabledata', inputs)
      .then(res => {
        console.log(res)
        callback();
      }).catch(error => {
        console.error('Error inserting data:', error);
        // Handle error, if any
      });
      
    setDialog(false);
    resetData();

    /* 
    var fmid = isEdit ? +activeRowData["fmid"] : Date.now();

    const regDttm = new Date(fmid + 9 * 3600 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const finalResult = { ...inputs };

    const usingData = finalResult;

    fetchFormattedData({
      from: "FROM ARD",
      where: `WHERE facility_name = "${usingData["facility_name"]}"`,
    }).then((res) => {
      const ardData = {
        fmid: '"' + fmid + '"',
        facility_name: '"' + usingData["facility_name"] + '"',
        // facility_info: '"' + usingData["facility_info"] + '"',
        final_maintenance_date:
          '"' +
          new Date(inputs["final_maintenance_date"])
            .toISOString()
            .slice(0, 19)
            .replace("T", " ") +
          '"',
        start_date:
          '"' +
          new Date(inputs["start_date"])
            .toISOString()
            .slice(0, 19)
            .replace("T", " ") +
          '"',
        end_date:
          '"' +
          new Date(inputs["end_date"])
            .toISOString()
            .slice(0, 19)
            .replace("T", " ") +
          '"',

        account: '"' + usingData["account"] + '"',
        business_num: '"' + usingData["business_num"] + '"',
        address: '"' + usingData["address"] + '"',
        business_kind: '"' + usingData["business_kind"] + '"',
        phone: '"' + usingData["phone"] + '"',
        buy_manager: '"' + usingData["buy_manager"] + '"',
        // unit_price: '"' + usingData["unit_price"] + '"',
        registered_date: '"' + regDttm + '"',
      };

      //for insert
      let keys = Object.keys(ardData);
      let keyString = keys.join();
      let values = Object.values(ardData);
      let valueString = values.join();

      // //for update
      var updateValues = [];

      for (var i = 0; i < keys.length; i++) {
        var a = keys[i] + "=" + values[i];
        updateValues.push(a);
      }
      let updateValuesString = updateValues.join();

      var body = isEdit
        ? `UPDATE  ARD SET ${updateValuesString} WHERE fmid =  "${res[0]["fmid"]}"`
        : `INSERT INTO ARD (${keyString}) VALUES (${valueString})`;

      insertData({ body: body }).then((res) => {
        isEdit ? callback1() : callback2();
      });
    });

    setDialog(false);
    resetData(); */
  };

  const onCancel = () => {
    setDialog(false);
    resetData();
  };

  const onValueChange = (e) => {
    const tempInputs = { ...inputs };
    tempInputs[e.target.name] = e.target.value;
    setInputs(tempInputs);

    const requisiteList = [
      "code",
      'company',
      'price',
      'change',
      'changePrecent',
      'start_date',
    ];

    let validationCheckList = [];

    Object.keys(tempInputs).forEach((key) => {
      if (requisiteList.includes(key)) {
        const value = tempInputs[key];
        const isChecked = value.length !== 0;
        validationCheckList.push(isChecked);
      }
    });

    if (validationCheckList.includes(false)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  return (
    <Dialog
      width={"500px"}
      title={`About ${isEdit ? "수정" : "등록"}`}
      confirmText={`${isEdit ? "수정" : "등록"}`}
      cancelText="취소"
      onConfirm={onConfirm}
      onCancel={onCancel}
      visible={dialog}
      isError={isError}
      errorMessage="*표시는 필수입력항목입니다. "
    >
      <PriceManagementBody>
        <ItemColumn>
          <Item key={"About"}>
            <ItemTitle>◆ Code *</ItemTitle>
            <InputItem
              name="code"
              type="text"
              placeholder={"텍스트 입력"}
              height={"34px"}
              onChange={onValueChange}
              defaultValue={inputs["code"]}
              disabled={isEdit}
            />
          </Item>
          {inputProps.map((input) => {
            return (
              <Item key={input.title}>
                <ItemTitle>◆ {input.title}</ItemTitle>
                <InputItem
                  name={input.name}
                  type={input.type}
                  defaultValue={inputs[input.name]}
                  placeholder={"텍스트 입력"}
                  height={"34px"}
                  onChange={onValueChange}
                />
              </Item>
            );
          })}
        </ItemColumn>
      </PriceManagementBody>
    </Dialog>
  );
}

const Item = styled.div`
  display: flex;
  flex-direction: row;

  gap: 40px;

  justify-content: start;
  align-items: center;

  font-size: 12px;
  font-weight: 500;
`;

const ItemTitle = styled.div`
  width: ${({ width }) => width ?? "100px"};
`;

/* const SmallInputItem = styled.input`
  width: 100px;
  height: 34px;
  font-size: 12px;

  resize: none;

  align-items: start;
  justify-content: start;

  padding: 8px 10px;

  background: white;
  color: black;

  border: 1px solid #a3b1be;

  ::placeholder {
    color: #dddddd;
  }
`; */

const InputItem = styled.input`
  width: 243px;
  height: ${(props) => props.height};
  font-size: 12px;

  resize: none;

  align-items: start;
  justify-content: start;

  padding: 8px 10px;

  background: white;
  color: black;

  border: 1px solid #a3b1be;

  ::placeholder {
    color: #dddddd;
  }
`;

const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/* const Row = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0px;
`; */

/* const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 10px;
`; */

const PriceManagementBody = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-around;

  padding-top: 30px;
  padding-bottom: 30px;
`;

export default AboutDialog;
