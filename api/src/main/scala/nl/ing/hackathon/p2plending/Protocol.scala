package nl.ing.hackathon.p2plending

import spray.json.DefaultJsonProtocol

case class Status(uptime: String)
case class Borrower(email: String)

trait Protocol extends DefaultJsonProtocol {
  implicit val statusFormatter = jsonFormat1(Status.apply)
  implicit val borrowerFormatter = jsonFormat1(Borrower.apply)
}
