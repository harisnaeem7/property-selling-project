import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
import dotenv from "dotenv";
dotenv.config();

const sts = new STSClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function test() {
  try {
    const response = await sts.send(new GetCallerIdentityCommand({}));
    console.log("AWS CREDENTIALS ARE VALID:", response);
  } catch (err: any) {
    console.error("STS ERROR:", err);
  }
}

test();
