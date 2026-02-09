export const TrackingScheduleInfoBySort = [
  {
    name: "开船",
    state: "BERTH",
    arriveTime: "",
    tableColumn: [
      {
        prop: "voyageNo",
        label: "航次",
      },
      {
        prop: "place",
        label: "开船码头",
      },
      {
        prop: "departureTime",
        label: "开船时间",
      },
    ],
    tableData: [],
  },
  {
    name: "重箱装船",
    state: "LOAD",
    arriveTime: "",
    tableColumn: [
      {
        prop: "vesselName",
        label: "船名",
      },
      {
        prop: "voyageNo",
        label: "航次",
      },
      {
        prop: "ctnNo",
        label: "箱号",
      },
      {
        prop: "place",
        label: "装船码头",
      },
      {
        prop: "businessDate",
        label: "装船时间",
      },
    ],
    tableData: [],
  },
  {
    name: "装载舱单",
    state: "MFT",
    arriveTime: "",
    tableColumn: [
      {
        prop: "billNo",
        label: "提单号",
      },
      {
        prop: "vesselName",
        label: "船名",
      },
      {
        prop: "voyageNo",
        label: "航次",
      },
      {
        prop: "state",
        label: "当前状态",
      },
    ],
    tableData: [],
  },
  {
    name: "码头放行",
    state: "DOCKPASS",
    arriveTime: "",
    tableColumn: [
      {
        prop: "ctnNo",
        label: "箱号",
      },
      {
        prop: "state",
        label: "状态",
      },
      {
        prop: "remark",
        label: "原因",
      },
      {
        prop: "businessDate",
        label: "码头反馈时间",
      },
    ],
    tableData: [],
  },
  {
    name: "海关放行",
    state: "CUSPASS",
    arriveTime: "",
    tableColumn: [
      {
        prop: "vesselName",
        label: "船名",
      },
      {
        prop: "voyageNo",
        label: "航次",
      },
      {
        prop: "entryId",
        label: "报关单号",
      },
      {
        prop: "billNo",
        label: "提单号",
      },
      {
        prop: "businessDate",
        label: "放行时间",
      },
      {
        prop: "state",
        label: "状态",
      },
    ],
    tableData: [],
  },
  {
    name: "海关查验",
    state: "CUSMOV",
    arriveTime: "",
    tableColumn: [
      {
        prop: "vesselName",
        label: "船名",
      },
      {
        prop: "voyageNo",
        label: "航次",
      },
      {
        prop: "billNo",
        label: "提单号",
      },
      {
        prop: "businessDate",
        label: "放行时间",
      },
      {
        prop: "state",
        label: "状态",
      },
    ],
    tableData: [],
  },
  {
    name: "预配舱单",
    state: "PREMFT",
    arriveTime: "",
    tableColumn: [
      {
        prop: "vesselName",
        label: "船名",
      },
      {
        prop: "voyageNo",
        label: "航次",
      },
      {
        prop: "billNo",
        label: "提单号",
      },
      {
        prop: "businessDate",
        label: "海关回执时间",
      },
      {
        prop: "state",
        label: "状态",
      },
    ],
    tableData: [],
  },
  {
    name: "重箱进港",
    state: "INOUT",
    arriveTime: "",
    tableColumn: [
      {
        prop: "ctnNo",
        label: "箱号",
      },
      {
        prop: "sealNo",
        label: "封号",
      },
      {
        prop: "place",
        label: "进港码头",
      },
      {
        prop: "businessDate",
        label: "出门时间",
      },
    ],
    tableData: [],
  },
  {
    name: "提箱",
    state: "EMPTY",
    arriveTime: "",
    tableColumn: [
      {
        prop: "ctnNo",
        label: "箱号",
      },
      {
        prop: "billNo",
        label: "提单号",
      },
      {
        prop: "place",
        label: "提箱堆场",
      },
      {
        prop: "businessDate",
        label: "进港时间",
      },
    ],
    tableData: [],
  },
];
