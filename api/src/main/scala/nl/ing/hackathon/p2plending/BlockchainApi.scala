package nl.ing.hackathon.p2plending

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.stream.ActorMaterializer
import akka.stream.scaladsl._

import scala.concurrent.Future

class BlockchainApi(endpoint: String/*, implicit val system: ActorSystem, implicit val materializer: ActorMaterializer*/) {

//  val connectionFlow: Flow[HttpRequest, HttpResponse, Future[Http.OutgoingConnection]] =
//    Http().outgoingConnection(endpoint)
//  val responseFuture: Future[HttpResponse] =
//    Source.single(HttpRequest(uri = "/"))
//      .via(connectionFlow)
//      .runWith(Sink.head)

  def getBorrower(name: String): Borrower = {
//    val response = Source.single(HttpRequest(uri = "/"))
//      .via(connectionFlow)
//      .runWith(Sink.head)
//    response.map(r => r.entity.toString)
    Borrower(s"$name@gmail.com")
  }
}
